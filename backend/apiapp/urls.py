from django.conf.urls import url, include
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter

from . import views

app_name = 'apiapp'
uuid_regex = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'

router = DefaultRouter()

urlpatterns = [
    url(r'^api/', include(router.urls)),

]
