import logging

import resend

from app.config.settings import settings


logger = logging.getLogger(__name__)


class EmailServiceError(RuntimeError):
    """Raised when an email cannot be sent."""


def _configure_resend() -> None:
    if not settings.resend_api_key:
        raise EmailServiceError("RESEND_API_KEY is not configured.")

    resend.api_key = settings.resend_api_key


async def send_email(
    *,
    to: str | list[str],
    subject: str,
    html: str | None = None,
    text: str | None = None,
    reply_to: str | None = None,
    from_address: str | None = None,
) -> str:
    """
    Send a transactional email through Resend.

    Returns the Resend email ID.
    """

    if not html and not text:
        raise ValueError("Email must include either html or text content.")

    _configure_resend()

    recipients = [to] if isinstance(to, str) else to

    params: resend.Emails.SendParams = {
        "from": from_address or settings.email_from,
        "to": recipients,
        "subject": subject,
    }

    if html:
        params["html"] = html

    if text:
        params["text"] = text

    if reply_to:
        params["reply_to"] = reply_to

    try:
        response = await resend.Emails.send_async(params)
        return response["id"]

    except Exception as exc:
        logger.exception("Failed to send email through Resend.")
        raise EmailServiceError("Unable to send email.") from exc


async def send_admin_email(
    *,
    subject: str,
    html: str | None = None,
    text: str | None = None,
    reply_to: str | None = None,
) -> str:
    """
    Send an internal website notification to Craig.
    """

    return await send_email(
        to=settings.admin_email,
        subject=subject,
        html=html,
        text=text,
        reply_to=reply_to,
    )

async def send_newsletter_confirmation_email(
    *,
    to: str,
    confirmation_url: str,
) -> str:
    """
    Send a double opt-in confirmation email
    to a new newsletter subscriber.
    """

    subject = "Confirm your subscription to CraigStueber.com"

    text = f"""
Thanks for signing up for updates from Craig A. Stueber.

Please confirm your email address by visiting this link:

{confirmation_url}

If you did not request this subscription, you can safely ignore this email.
""".strip()

    html = f"""
<!DOCTYPE html>
<html>
  <body style="
    margin: 0;
    padding: 0;
    background: #f7f3eb;
    color: #1d1c19;
    font-family: Arial, Helvetica, sans-serif;
  ">
    <div style="
      max-width: 600px;
      margin: 0 auto;
      padding: 48px 24px;
    ">
      <div style="
        background: #fbf9f5;
        border: 1px solid #d8d0c2;
        padding: 40px;
      ">
        <p style="
          margin: 0 0 12px;
          color: #975c35;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        ">
          Craig A. Stueber
        </p>

        <h1 style="
          margin: 0 0 20px;
          color: #1d1c19;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 32px;
          font-weight: 400;
          line-height: 1.2;
        ">
          Confirm your subscription
        </h1>

        <p style="
          margin: 0 0 24px;
          color: #686158;
          font-size: 16px;
          line-height: 1.7;
        ">
          Thanks for signing up for updates from Craig A. Stueber.
          Please confirm your email address to complete your subscription.
        </p>

        <p style="margin: 32px 0;">
          <a
            href="{confirmation_url}"
            style="
              display: inline-block;
              padding: 13px 22px;
              background: #975c35;
              color: #ffffff;
              text-decoration: none;
              font-size: 15px;
              font-weight: 700;
            "
          >
            Confirm Subscription
          </a>
        </p>

        <p style="
          margin: 24px 0 0;
          color: #8a8278;
          font-size: 13px;
          line-height: 1.6;
        ">
          If you did not request this subscription, you can safely
          ignore this email.
        </p>
      </div>
    </div>
  </body>
</html>
""".strip()

    return await send_email(
        to=to,
        subject=subject,
        html=html,
        text=text,
    )