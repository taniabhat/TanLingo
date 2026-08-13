import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from .config import get_settings

logger = logging.getLogger(__name__)


def send_registration_email(to_email: str, username: str) -> bool:
    """Send welcome email after successful registration. Returns True if sent."""
    settings = get_settings()

    subject = "Welcome to Duolingo Clone!"
    html_body = f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
        <div style="background: #58cc02; padding: 24px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0;">🦉 Duolingo Clone</h1>
        </div>
        <div style="padding: 24px; border: 2px solid #e5e5e5; border-top: none; border-radius: 0 0 12px 12px;">
          <h2>Welcome, {username}!</h2>
          <p>Your account has been created successfully. You're ready to start learning languages for free!</p>
          <p>Choose from 10+ languages and begin your learning journey today.</p>
          <p style="text-align: center; margin: 32px 0;">
            <a href="{settings.APP_URL}/courses"
               style="background: #58cc02; color: white; padding: 14px 28px;
                      text-decoration: none; border-radius: 12px; font-weight: bold;">
              Start Learning
            </a>
          </p>
          <p style="color: #888; font-size: 14px;">Happy learning!<br>The Duolingo Clone Team</p>
        </div>
      </body>
    </html>
    """
    text_body = (
        f"Welcome, {username}!\n\n"
        f"Your account has been created successfully.\n"
        f"Visit {settings.APP_URL}/courses to pick a language and start learning.\n\n"
        f"Happy learning!\nThe Duolingo Clone Team"
    )

    if not settings.SMTP_HOST:
        logger.warning(
            "SMTP not configured — registration email for %s logged only. "
            "Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD in .env",
            to_email,
        )
        logger.info("Registration email for %s (%s): %s", username, to_email, subject)
        return False

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"{settings.SMTP_FROM_NAME} <{settings.SMTP_FROM_EMAIL}>"
    msg["To"] = to_email
    msg.attach(MIMEText(text_body, "plain"))
    msg.attach(MIMEText(html_body, "html"))

    try:
        if settings.SMTP_PORT == 465:
            with smtplib.SMTP_SSL(settings.SMTP_HOST, settings.SMTP_PORT, timeout=15) as server:
                if settings.SMTP_USER and settings.SMTP_PASSWORD:
                    server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.sendmail(settings.SMTP_FROM_EMAIL, to_email, msg.as_string())
        else:
            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=15) as server:
                if settings.SMTP_USE_TLS:
                    server.starttls()
                if settings.SMTP_USER and settings.SMTP_PASSWORD:
                    server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.sendmail(settings.SMTP_FROM_EMAIL, to_email, msg.as_string())
        logger.info("Registration email sent to %s", to_email)
        return True
    except Exception as exc:
        logger.error("Failed to send registration email to %s: %s", to_email, exc)
        return False
