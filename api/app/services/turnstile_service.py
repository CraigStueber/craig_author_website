import logging

import httpx

from app.config.settings import settings


logger = logging.getLogger(__name__)

TURNSTILE_VERIFY_URL = (
    "https://challenges.cloudflare.com/turnstile/v0/siteverify"
)


class TurnstileVerificationError(RuntimeError):
    """Raised when Turnstile verification cannot be completed."""


async def verify_turnstile(
    *,
    token: str,
    remote_ip: str | None = None,
    expected_action: str | None = None,
) -> bool:
    if not token.strip():
        return False

    payload: dict[str, str] = {
        "secret": settings.turnstile_secret_key,
        "response": token,
    }

    if remote_ip:
        payload["remoteip"] = remote_ip

    try:
        async with httpx.AsyncClient(
            timeout=10.0
        ) as client:
            response = await client.post(
                TURNSTILE_VERIFY_URL,
                data=payload,
            )

            response.raise_for_status()

            result = response.json()

    except (
        httpx.HTTPError,
        ValueError,
    ) as exc:
        logger.exception(
            "Unable to verify Turnstile token."
        )

        raise TurnstileVerificationError(
            "Unable to verify Turnstile token."
        ) from exc

    if not result.get("success"):
        logger.warning(
            "Turnstile verification failed: %s",
            result.get("error-codes", []),
        )

        return False

    is_local_test = (
        settings.environment == "development"
        and settings.turnstile_secret_key
        == "1x0000000000000000000000000000000AA"
    )

    if expected_action and not is_local_test:
        action = result.get("action")

        if action != expected_action:
            logger.warning(
                "Turnstile action mismatch. "
                "Expected %s, received %s.",
                expected_action,
                action,
            )

            return False

    return True