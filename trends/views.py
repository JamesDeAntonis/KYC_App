from django.shortcuts import render
# from trends.client.Capstone_KYC.client import *  # doubt this is right
import sys
import os

from .client.Capstone_KYC.client.client import Client

from .forms import homepage_form
from django.http import HttpResponseRedirect
import pandas as pd
from django.views.generic import TemplateView
from django.views.generic.edit import FormView

# import plotly
# import plotly.express as px


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

class Explore(TemplateView):
    template_name = 'trends/explore.html'
    form_class = homepage_form
    # print(dir(form_class))
    # print(form_class.cleaned_data)
    # print(form.cleaned_data)
    # cl = Client(entity)
    # context['client'] = cl
    # context['entity'] = entity

    def get(self, request, *args, **kwargs):
        print('get')
        form = self.form_class()
        return render(request, self.template_name, {'form': form})

    def post(self, request, *args, **kwargs):
        print('posted')
        form = homepage_form(request.POST)
        if form.is_valid():
            # <process form cleaned data>
            entity = form.cleaned_data['entity']
            print('getting the client')
            client = Client(entity)
            print('getting the anomalies')
            anomalies = client.get_anomalies()
            print('getting the plot')
            plot = client.plot_interest_with_anomalies(plotly=True, as_var=True)
            print('getting the urls')
            urls = client.get_links()
            print('rendering...')
            # plot = plotly.offline.plot(plot, auto_open=False, output_type='div')
            return render(request, self.template_name, {'entity': client, 'plot': plot})

    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #     context["post_user"] = self.post_user
    #     return context
