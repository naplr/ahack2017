from django.shortcuts import render
from .serializers import *
from rest_framework import viewsets
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotAllowed
from .models import *
import json
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
class ApiUserViewSet(viewsets.ModelViewSet):
    queryset = ApiUser.objects.all()
    serializer_class = ApiUserSerializer


class DropViewSet(viewsets.ModelViewSet):
    queryset = Drop.objects.all()
    # serializer_class = DropSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return DropSerializerDebug
        return DropSerializer


class FilterViewSet(viewsets.ModelViewSet):
    queryset = Filter.objects.all()
    serializer_class = FilterSerializer


def explore(request):
    if request.method == 'GET':

        user_id = request.GET.get('userId', None)
        if (user_id is None):
            return HttpResponseBadRequest('must provide userId')
        lat = request.GET.get('lat', None)
        if (lat is None):
            return HttpResponseBadRequest('must provide lat')
        lng = request.GET.get('lng', None)
        if (lng is None):
            return HttpResponseBadRequest('must provide lng')
        try:
            user = ApiUser.objects.get(userid=user_id)
        except ApiUser.DoesNotExist:
            return HttpResponseBadRequest('user with that ID not found')

        nearby = Drop.objects.filter().exclude(creator=user,receiver=user)
        return JsonResponse([d['id'] for n in nearby], safe=False)
    else:
        return HttpResponseNotAllowed('use GET only')


@csrf_exempt
def collect_drop(request):
    if request.method == 'POST':
        try:
            received_json_data = json.loads(request.body.decode('UTF-8'))
        except Exception:
            return HttpResponseBadRequest('unable to decode JSON')

        if 'userId' not in received_json_data:
            return HttpResponseBadRequest('must provide userId')
        if 'dropId' not in received_json_data:
            return HttpResponseBadRequest('must provide dropId')
        try:
            user = ApiUser.objects.get(userId=received_json_data['userId'])
        except ApiUser.DoesNotExist:
            return HttpResponseBadRequest('user with that ID not found')
        try:
            drop = Drop.objects.get(id=uuid.UUID(received_json_data['dropId']))
        except Drop.DoesNotExist:
            return HttpResponseBadRequest('drop with that ID not found')
        if drop.total_amount <= 0:
            return JsonResponse({"status": 'drop count depleted'})
        user.drop_received.add(drop)
        user.save()
        return JsonResponse({"status": 'successful'})
    else:
        return HttpResponseNotAllowed('use POST only')


def get_drops(request):
    if request.method == 'GET':

        user_id = request.GET.get('userId', None)
        if (user_id is None):
            return HttpResponseBadRequest('must provide userId')
        filter = request.GET.get('filter', None)
        if (filter is None):
            return HttpResponseBadRequest('must provide filter')
        if filter == 'created':
            d = Drop.objects.values_list('id', flat=True).filter(creator__userid=user_id)
        else:
            d = Drop.objects.values_list('id', flat=True).filter(receiver__userid=user_id)
        return JsonResponse(list(d), safe=False)
    else:
        return HttpResponseNotAllowed('use GET only')
