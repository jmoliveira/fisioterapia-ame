from django.contrib import admin
from models import Paciente, Estado, Pais
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
           {'fields': ('endereco', 'complemento', 'bairro', 'municipio', 'pais', 'estado', 'cep', 'telefone', 'celular'), 
            }
        ),
     )
    
    def get_form(self, request, obj=None, **kwargs):
#        import pdb; pdb.set_trace()
        if obj is not None:
            if request.POST.has_key("pais") and not request.POST.get("pais", None):
                self.form.base_fields['estado'].queryset = Estado.objects.filter(pais=request.POST.get("pais"))
                self.form.base_fields['estado'].choices.queryset = self.form.base_fields['estado'].queryset
                self.form.base_fields['estado'].widget.queryset = self.form.base_fields['estado'].queryset
            else:
                self.form.base_fields['estado'].queryset = Estado.objects.filter(pais=obj.pais)
#                self.form.base_fields['estado'].choices.queryset = self.form.base_fields['estado'].queryset
#                self.form.base_fields['estado'].widget.queryset = self.form.base_fields['estado'].queryset
                
#            self.form = game_form_factory(obj.season.sport)
        return super(PacienteAdmin, self).get_form(request, obj, **kwargs)    
#    'classes': ['collapse']
    
class EstadoAdmin(admin.ModelAdmin):
    list_display = ('nome','pais')
    form = EstadoForm

class PaisAdmin(admin.ModelAdmin):
    pass
 

admin.site.register(Estado, EstadoAdmin)
admin.site.register(Paciente, PacienteAdmin)
admin.site.register(Pais, PaisAdmin)
