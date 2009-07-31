from django.forms.models import ModelForm, ModelChoiceField
from django.contrib.admin.widgets import FilteredSelectMultiple
from ame.models import Paciente, Estado, Pais

class PacienteForm(ModelForm):
#    estado = ModelChoiceField(queryset=Duplicata.objects.filter(Q(status='I')|Q(status='L')) 
#    duplicata = forms.ModelChoiceField(queryset = Duplicata.objects.filter(status__in = ['L','I'])) 
    
    #estado = ModelChoiceField(queryset=Paciente.objects.all(), empty_label="--------- ai sim ----------")
    
    class Meta:
        model = Paciente
        
class EstadoForm(ModelForm):
    #pais = ModelChoiceField(queryset=Pais.objects.all(), widget=FilteredSelectMultiple("aaa",False))
    
    class Meta:
        model = Estado        