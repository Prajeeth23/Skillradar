import json
import logging
import time
from typing import Any, Dict, Optional, Type, TypeVar
from pydantic import BaseModel
from groq import Groq
from app.core.config import settings

logger = logging.getLogger("skillradar.ai")
logging.basicConfig(level=logging.INFO)

T = TypeVar("T", bound=BaseModel)


class GroqService:
    def __init__(self):
        self.api_key = settings.GROQ_API_KEY
        self.model = settings.GROQ_MODEL
        self.timeout = settings.GROQ_TIMEOUT_SECONDS
        self._client: Optional[Groq] = None

    @property
    def client(self) -> Optional[Groq]:
        if not self.api_key:
            return None
        if self._client is None:
            self._client = Groq(api_key=self.api_key, timeout=self.timeout)
        return self._client

    def is_available(self) -> bool:
        return bool(self.api_key and len(self.api_key.strip()) > 5)

    def execute_structured_completion(
        self,
        system_prompt: str,
        user_prompt: str,
        response_model: Type[T],
        temperature: float = 0.2,
        max_retries: int = 2,
    ) -> Optional[T]:
        """Execute Groq chat completion and parse into Pydantic schema with retry backoff."""
        if not self.is_available():
            logger.info("Groq API key not provided. Diverting to high-fidelity deterministic engine.")
            return None

        client = self.client
        if not client:
            return None

        # Instruct model to output raw JSON adhering to the model schema
        schema_json = json.dumps(response_model.model_json_schema())
        enforced_system_prompt = (
            f"{system_prompt}\n\n"
            f"IMPORTANT: You MUST respond ONLY with valid JSON matching this exact JSON schema:\n"
            f"{schema_json}\n"
            f"Do not include any conversational filler, markdown formatting (no ```json codeblocks), "
            f"or text outside the raw JSON object."
        )

        for attempt in range(max_retries + 1):
            try:
                response = client.chat.completions.create(
                    model=self.model,
                    messages=[
                        {"role": "system", "content": enforced_system_prompt},
                        {"role": "user", "content": user_prompt},
                    ],
                    response_format={"type": "json_object"},
                    temperature=temperature,
                )
                raw_content = response.choices[0].message.content
                if not raw_content:
                    continue

                cleaned_content = raw_content.strip()
                if cleaned_content.startswith("```json"):
                    cleaned_content = cleaned_content[7:]
                if cleaned_content.startswith("```"):
                    cleaned_content = cleaned_content[3:]
                if cleaned_content.endswith("```"):
                    cleaned_content = cleaned_content[:-3]
                cleaned_content = cleaned_content.strip()

                parsed_dict = json.loads(cleaned_content)
                validated_model = response_model.model_validate(parsed_dict)
                return validated_model

            except Exception as e:
                logger.warning(
                    f"Groq API structured execution attempt {attempt + 1} failed: {str(e)}"
                )
                if attempt < max_retries:
                    time.sleep(1.0 * (attempt + 1))
                else:
                    logger.error("All Groq API retries exhausted.")
                    return None

        return None

    def execute_chat_completion(
        self,
        system_prompt: str,
        user_message: str,
        history: Optional[list] = None,
        temperature: float = 0.4,
    ) -> Optional[str]:
        """Conversational chat completion without strict schema constraints."""
        if not self.is_available():
            return None

        client = self.client
        if not client:
            return None

        messages = [{"role": "system", "content": system_prompt}]
        if history:
            messages.extend(history)
        messages.append({"role": "user", "content": user_message})

        try:
            response = client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=temperature,
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"Groq chat completion error: {str(e)}")
            return None


groq_service = GroqService()
