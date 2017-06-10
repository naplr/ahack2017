import json

import datetime
import gpxpy.geo
import gpxpy.geo
from django.db.models import Q
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets

from .serializers import *


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

def get_nearby_location(lat,lng,user):
    nearby = Drop.objects.filter(Q(from_date__isnull=True) | Q(from_date__lte=datetime.datetime.utcnow())) \
        .filter(Q(to_date__isnull=True) | Q(to_date__gte=datetime.datetime.utcnow())) \
        .filter(total_amount__gt=0, lat__lt=float(lat) + 0.1, lat__gt=float(lat) - 0.1, lng__lt=float(lng) + 0.1, lng__gt=float(lng) - 0.1) \
        .exclude(creator=user) \
        .exclude(receiver=user)

    if len(nearby)==0:
        return ''
    return nearby[0].id

def explore(request):
    # TODO CHECK TIME
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
            user = ApiUser.objects.get(userId=user_id)
        except ApiUser.DoesNotExist:
            return HttpResponseBadRequest('user with that ID not found')

        nearby = get_nearby_location(lat,lng,user)
        #return JsonResponse([n.id for n in nearby if gpxpy.geo.haversine_distance(float(lat), float(lng), n.lat, n.lng) <= 2000], safe=False)

        return JsonResponse(nearby, safe=False)

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
        # TODO maybe check specific user haven't got this drop already
        # TODO receiver ain't the creator!
        # TODO expired!
        # user.drop_received.add(drop)
        # user.save()
        UserDrop.objects.create(user=user, drop=drop)
        drop.total_amount = drop.total_amount - 1
        drop.save()
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
