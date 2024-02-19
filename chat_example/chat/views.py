from django.shortcuts import render


def index(request):
   return render(request, 'chat/index.html' ) # this is the index.html as specified in settings.py templates[0].DIRS


def room(request, room_name):
   return render(request, 'chat/room.html', {'room_name': room_name })