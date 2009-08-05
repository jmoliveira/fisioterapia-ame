from django.forms.models import ModelForm, ModelChoiceField
from ame.models import Paciente, Estado


class PacienteForm(ModelForm):
    
    class Meta:
        model = Paciente

        
class EstadoForm(ModelForm):
    
    class Meta:
        model = Estado        