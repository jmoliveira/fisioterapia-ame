from django.forms.models import ModelForm, ModelChoiceField
from django.contrib.admin.widgets import FilteredSelectMultiple
from ame.models import Paciente, Estado, Pais

    #pais = ModelChoiceField(queryset=Pais.objects.all(), widget=FilteredSelectMultiple("aaa",False))
    #estado = ModelChoiceField(queryset=Duplicata.objects.filter(Q(status='I')|Q(status='L')) 
    #estado = ModelChoiceField(queryset=Estado.objects.all())


class PacienteForm(ModelForm):
    estado = ModelChoiceField(queryset=Estado.objects.none(), empty_label="Selecione o estado")
    
    class Meta:
        model = Paciente

        
class EstadoForm(ModelForm):
    
    class Meta:
        model = Estado        