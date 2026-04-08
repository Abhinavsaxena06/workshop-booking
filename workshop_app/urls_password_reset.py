from django.urls import re_path as url
from django.contrib.auth.views import PasswordResetView, PasswordResetConfirmView, PasswordResetDoneView, PasswordResetCompleteView

urlpatterns = [
    url(r'^forgotpassword/$', password_reset,
        name="password_reset"),
    url(r'^password_reset/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$',
        password_reset_confirm,
        name='password_reset_confirm'),
    url(r'^password_reset/mail_sent/$', password_reset_done,
        name='password_reset_done'),
    url(r'^password_reset/complete/$', password_reset_complete,
        name='password_reset_complete'),
    url(r'^changepassword/$', password_change,
        name='password_change'),
    url(r'^password_change/done/$', password_change_done,
        name='password_change_done'),
]
