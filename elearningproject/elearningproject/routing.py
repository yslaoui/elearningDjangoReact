from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
import chat_example.routing  # Import your WebSocket routing

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # Django's ASGI application to handle traditional HTTP requests
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns  # Your WebSocket routing
        )
    ),
})
