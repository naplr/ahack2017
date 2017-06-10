from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from . import views

app_name = 'apiapp'
uuid_regex = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'

router = DefaultRouter()
router.register(r'users', views.ApiUserViewSet)
router.register(r'drops', views.DropViewSet)
router.register(r'filters', views.FilterViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api/explore', views.explore),
    url(r'^api/get-drops', views.get_drops),
    url(r'^api/collected-drop', views.collect_drop),
    url(r'^api/reverse-geocode', views.reverse_geocode),
]
