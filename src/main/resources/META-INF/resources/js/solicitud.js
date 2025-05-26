async function cargarPersonas() {
  const res = await fetch('/personas');
  const personas = await res.json();
  const select = document.getElementById('select-persona');
  select.innerHTML = '<option value="">Selecciona una persona</option>';
  personas.forEach(p => {
    select.innerHTML += `<option value="${p.id}">${p.nombre} (${p.correo})</option>`;
  });
}

async function cargarMascotasDisponibles() {
  const res = await fetch('/mascotas');
  const mascotas = await res.json();
  const select = document.getElementById('select-mascota');
  select.innerHTML = '<option value="">Selecciona una mascota</option>';
  mascotas.forEach(m => {
    if (m.estado === 'disponible') {
      select.innerHTML += `<option value="${m.id}">${m.nombre} (${m.tipo})</option>`;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  cargarPersonas();
  cargarMascotasDisponibles();

  document.getElementById('form-solicitud').addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    
    // Validaciones básicas
    if (!data.idPersona || !data.idMascota) {
        alert('Por favor selecciona una persona y una mascota');
        return;
    }

    try {
        const res = await fetch('/solicitudes', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                idPersona: Number(data.idPersona),
                idMascota: Number(data.idMascota)
            }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Error ${res.status}: ${errorText || 'No se pudo procesar la solicitud'}`);
        }

        alert('Solicitud enviada exitosamente');
        e.target.reset();
        cargarMascotasDisponibles(); // Recargar lista de mascotas disponibles
    } catch (error) {
        console.error('Error completo:', error);
        alert(`Error al enviar solicitud: ${error.message}`);
    }
  });
});
