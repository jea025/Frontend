import { createClient } from '@/utils/supabase/server'
import Nosotros from "@/components/Nosotros/Nosotros";
import Carrusel from "../../components/Carrusel/Carrusel";

interface ConfigData {
  [key: string]: string
}

async function getConfig(): Promise<ConfigData> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('configuracion')
    .select('clave, valor')
    .in('clave', [
      'titulo_web',
      'descripcion_larga', 
      'foto_principal',
      'mision_texto',
      'vision_texto',
      'carrusel_titulo_1',
      'carrusel_titulo_2',
      'carrusel_titulo_3',
      'programas_list',
      'conocenos_list',
      'prensa_list',
      'contacto_email',
      'contacto_telefono',
      'direccion',
      'facebook_url',
      'instagram_url',
      'logo_header'
    ])

  if (error) {
    console.error('Error cargando configuración:', error)
    return {}
  }

  // Convert array to key-value object
  const config: ConfigData = {}
  data?.forEach(item => {
    config[item.clave] = item.valor
  })

  return config
}

export const revalidate = 30 // Revalidar cada 30 segundos

export default async function HomePage() {
  const config = await getConfig()

  return (
    <div className="w-full h-auto overflow-x-hidden">
      <div className="w-full h-auto overflow-x-hidden">
        <Carrusel 
          foto_principal={config.foto_principal}
          titulo_web={config.titulo_web}
          carrusel_titulo_1={config.carrusel_titulo_1}
          carrusel_titulo_2={config.carrusel_titulo_2}
          carrusel_titulo_3={config.carrusel_titulo_3}
        />
      </div>
      <Nosotros 
        descripcion_larga={config.descripcion_larga}
        mision_texto={config.mision_texto}
        vision_texto={config.vision_texto}
        programas_list={config.programas_list}
        conocenos_list={config.conocenos_list}
        prensa_list={config.prensa_list}
      />
    </div>
  );
}
