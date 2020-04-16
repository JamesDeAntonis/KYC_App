from django import forms

class homepage_form(forms.Form):
    entity = forms.CharField(max_length=32,
                 widget=forms.TextInput(attrs={'class': 'form-control',
                                               'placeholder': 'Whom to explore?'}))
