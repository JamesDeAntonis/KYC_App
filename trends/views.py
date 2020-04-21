from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.views.generic import TemplateView
from django.views.generic.edit import FormView
from django.utils.safestring import mark_safe

import sys
import os

from client.client import Client

from .forms import homepage_form
import pandas as pd
import jsonpickle
import json


# Create your views here.

class Index(FormView):
    template_name = 'trends/index.html'
    form_class = homepage_form

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = self.form_class
        return context

    def form_valid(self, form):
        print('ASDFADSF')
        pass

class AboutUs(TemplateView):
    template_name = 'trends/about_us.html'

class Explore(TemplateView):
    template_name = 'trends/explore.html'
    form_class = homepage_form

    def get(self, request, *args, **kwargs):
        print('get')
        form = self.form_class()
        return render(request, self.template_name, {'form': form})

    def post(self, request, *args, **kwargs):
        print('posted')
        form = homepage_form(request.POST)
        if form.is_valid():
            print('rendering...')
            return render(request, self.template_name, context=self.get_context_data(form=form))

    def get_context_data(self, form, **kwargs):
        context = super().get_context_data(**kwargs)
        entity = form.cleaned_data['entity']
        context['name'] = entity

        print('getting the client')
        client = Client(entity)

        print('getting the anomalies')
        anomalies = client.get_anomalies()
        context['anomalies'] = mark_safe(json.dumps([anomaly.strftime('%m/%d/%y') for anomaly in anomalies]))

        print('getting the plot')
        context['plot'] = client.plot_interest_with_anomalies(plotly=True, as_var=True)

        print('getting the articles')
        context['urls'] = mark_safe(json.dumps(list(client.get_links().values())))
        # context['images'] = mark_safe(json.dumps(list(client.get_image().values())))
        # articles = client.get_articles()
        # context['titles'] = mark_safe(json.dumps(list(articles['titles'].values())))
        # context['texts'] = mark_safe(json.dumps(list(articles['texts'].values())))

        return context
