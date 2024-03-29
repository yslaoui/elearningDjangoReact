import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

from elearningapp.routing import websocket_urlpatterns

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "elearningproject.settings")

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # Django's ASGI application to handle traditional HTTP requests
    "websocket": AllowedHostsOriginValidator(
            AuthMiddlewareStack(URLRouter(websocket_urlpatterns))
        ),
})



