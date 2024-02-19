import json
from channels.generic.websocket import AsyncWebsocketConsumer
import pprint
class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Create room_name and group_name strings
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = 'group_%s'%self.room_name
        # User channel joins group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)


    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        await self.channel_layer.group_send(self.room_group_name, 
                                 {"type": "chat_message",
                                  "message_payload": text_data_json} )

        # self.send(text_data=json.dumps({
        #     'message': message
        # }))

    async def chat_message(self, event):
        message_payload = event["message_payload"]
        await self.send(text_data = json.dumps(message_payload))
