import smtplib

EMAIL = "zen.jaiswal34@gmail.com"
EMAIL_PASSWORD = "ayoc ztog njed bszj"

try:
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(EMAIL, EMAIL_PASSWORD)
    print("✅ Login successful")
    server.quit()
except smtplib.SMTPAuthenticationError as e:
    print("❌ Authentication failed:", e.smtp_error.decode())
