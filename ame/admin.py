from django.contrib import admin
from models import Paciente, Estado
from forms import PacienteForm, EstadoForm

#class PacienteInline(admin.TabularInline):
#    model = Paciente

class PacienteAdmin(admin.ModelAdmin):
    form = PacienteForm
    list_display = ('nome','email')
    search_fields = ('nome',)
    fieldsets = (
        (None,
           {'fields': ('nome', 'sexo', 'data_nascimento', 'email')}
        ),
        (u'Endereco',
           {'fields': ('endereco', 'complemento', 'bairro', 'municipio', 'estado', 'cep', 'telefone', 'celular'), 
            }
        ),
     )
#    'classes': ['collapse']
    
class EstadoAdmin(admin.ModelAdmin):
    list_display = ('nome',)
    form = EstadoForm
 
admin.site.register(Estado, EstadoAdmin)
admin.site.register(Paciente, PacienteAdmin)
