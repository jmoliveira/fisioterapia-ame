# coding: utf-8
from django.http import HttpResponse, Http404
from django.shortcuts import render_to_response, get_object_or_404
from django.template.loader import render_to_string
from django.utils import simplejson
from ame.models import Estado



def estados(request, limit=10):
    query = request.GET.get('q', None)
    json_response = []

    if query:
        estados = Estado.objects.filter(pais__id__exact=query)
    else:
        estados = Estado.objects.all()[:limit]

    for estado in estados:
        json_response.append({'oV':unicode(estado.id),'oT':estado.nome})

    return HttpResponse(simplejson.dumps(json_response))
