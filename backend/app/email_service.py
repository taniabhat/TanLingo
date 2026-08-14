import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from .config import get_settings

logger = logging.getLogger(__name__)


def _send_email(to_email: str, subject: str, html_body: str, text_body: str) -> bool:
    """Helper function to send MIME emails over SMTP."""
    settings = get_settings()

    if not settings.SMTP_HOST:
        logger.warning(
            "SMTP not configured — email to %s ('%s') logged only. "
            "Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD in .env",
            to_email, subject,
        )
        logger.info("Mock Email for %s: %s", to_email, subject)
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
        logger.info("Email '%s' sent successfully to %s", subject, to_email)
        return True
    except Exception as exc:
        logger.error("Failed to send email '%s' to %s: %s", subject, to_email, exc)
        return False


def send_registration_email(to_email: str, username: str) -> bool:
    """Send welcome email after successful registration."""
    settings = get_settings()
    subject = "Welcome to TanLingo!"
    html_body = f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
        <div style="background: #58cc02; padding: 24px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0;">🦉 TanLingo</h1>
        </div>
        <div style="padding: 24px; border: 2px solid #e5e5e5; border-top: none; border-radius: 0 0 12px 12px;">
          <h2>Welcome to TanLingo, {username}! 🎉</h2>
          <p>Your account has been created successfully. You're ready to start learning 10+ languages for free!</p>
          <p style="text-align: center; margin: 32px 0;">
            <a href="{settings.APP_URL}/courses"
               style="background: #58cc02; color: white; padding: 14px 28px;
                      text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px;">
              Start Learning Now
            </a>
          </p>
          <p style="color: #888; font-size: 14px;">Happy learning!<br>The TanLingo Team</p>
        </div>
      </body>
    </html>
    """
    text_body = (
        f"Welcome to TanLingo, {username}!\n\n"
        f"Your account has been created successfully.\n"
        f"Visit {settings.APP_URL}/courses to pick a language and start learning.\n\n"
        f"Happy learning!\nThe TanLingo Team"
    )
    return _send_email(to_email, subject, html_body, text_body)


def send_course_completion_email(to_email: str, username: str, course_name: str) -> bool:
    """Send congratulatory email after completing a language course."""
    settings = get_settings()
    subject = f"🏆 Congratulations! You mastered {course_name} on TanLingo!"
    html_body = f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
        <div style="background: #ffc800; padding: 24px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #333; margin: 0;">🎓 Course Completed!</h1>
        </div>
        <div style="padding: 24px; border: 2px solid #e5e5e5; border-top: none; border-radius: 0 0 12px 12px;">
          <h2>Outstanding work, {username}! 🌟</h2>
          <p>You have officially completed the <strong>{course_name}</strong> language course on TanLingo!</p>
          <p>You've earned new crowns, XP, and badges. Keep up your amazing learning momentum by starting a new language course today.</p>
          <p style="text-align: center; margin: 32px 0;">
            <a href="{settings.APP_URL}/courses"
               style="background: #1cb0f6; color: white; padding: 14px 28px;
                      text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px;">
              Explore More Courses
            </a>
          </p>
          <p style="color: #888; font-size: 14px;">Keep shining!<br>The TanLingo Team</p>
        </div>
      </body>
    </html>
    """
    text_body = (
        f"Outstanding work, {username}!\n\n"
        f"You have officially completed the {course_name} course on TanLingo!\n"
        f"Visit {settings.APP_URL}/courses to start learning another language today.\n\n"
        f"Keep shining!\nThe TanLingo Team"
    )
    return _send_email(to_email, subject, html_body, text_body)

