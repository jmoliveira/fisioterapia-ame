from django import template
from django.conf import settings
from django.conf.urls.defaults import *
from django.contrib import admin

# Uncomment the next two lines to enable the admin:
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/ame/', include('ame.urls')),
    # admin django
    url(r'^admin$', 'django.views.generic.simple.redirect_to', {'url': '/admin/'}, name='home_admin'),
    url(r'^admin/', include(admin.site.urls)),
    (r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
)
