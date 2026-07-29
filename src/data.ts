import { Teacher, Subject, SuccessStory, GalleryItem, HonorStudent, PartnerCompany, AppNotification, PortalStats } from './types';

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 't1',
    name: 'Edwin Bautista',
    specialty: 'Especialista en Programación',
    description: 'Líder académico con amplia trayectoria en formación de desarrolladores y lógica de sistemas.',
    email: 'edwin.bautista@cemgalvarocontreras.edu.hn',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG-fj64TYgrjjMC-WjRsGHCrh6Kh5phjfSa5Q-s7eKds7lUlyjGJ2ILu2_JKuXe3Nhzefhiownr6cgWUL5Do4phYiKFMl2U3vi3HNSZ79DKVcExiaFxP8uyRTUcra5ifrXxjfGIg2aui8aRKnQx2Gn4fudsx7N9mlWWIEbYyOl5u2k1nJzG60NaLgHI3WcClyPhpHnqJrXEu4T8x5V73q3IqgflwXS4IYOcIRjCYo7ovfCbXnhOiKSASleI559-7kFBK-yjNCmUHA'
  },
  {
    id: 't2',
    name: 'José Luis García',
    specialty: 'Soporte y Hardware',
    description: 'Experto en arquitectura de computadores y mantenimiento de infraestructura tecnológica crítica.',
    email: 'jose.garcia@cemgalvarocontreras.edu.hn',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHdj_4C-9JNQbw52JIPoV5gZXmpgl-rKRwP-AUHUM4Hx_xV7KKPZoWNRHIX9oC3iVKl538DOfuF5RQ9sPbGkobb2lclnN6biEuZ3NdgY6UCnxpjUr7w4sP2iVI9MJh6rHhEOTZfX4AnDKvnINRgpc4oTp9Y6deYn8CHXZdYGjE7UrwdJWS1bttLWrQaKZCKjvtSh4tMMojrfNnr5iY1tq_GJZxkpydkTDIlaWvlmRtH0OR9Ccej9-_SKxgG7FVqVIEEqKUu95WiEk'
  },
  {
    id: 't3',
    name: 'Ronald Henríquez',
    specialty: 'Diseño y Web',
    description: 'Facilitador en áreas de diseño gráfico digital y desarrollo de interfaces de usuario modernas.',
    email: 'ronald.henriquez@cemgalvarocontreras.edu.hn',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDzCqgdXkCmAgNsGOk-OSvkw3ioKNKIe1mNDvWQB7Esgm8DkC3BQK5Q3UL-IfLJTvKEImDyepG1owJe4j--yYY-cn9YhBonHyhcgD7ydVGioYmvk91X6Dw-doP4oiO4DYeYdpFyk7UYxe9aVFy6sACb9KEacP_tXi2sy3hJlsLGnElNLT_TWNe9eJwTulH5lcs9E7rWmiOgYGjVbHQmeqSyqmr7vGzH9o4FbHNy35BB79tAN0NzKeGVXsegrXq0wwyktOmz1zTey8'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Mantenimiento preventivo en el laboratorio 1',
    category: 'Mantenimiento',
    date: '2024-10-15',
    description: 'Estudiantes de segundo año aplicando limpieza y diagnóstico de hardware a los equipos de escritorio del laboratorio principal.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvGzsXcpXpkuij_1sR_iWxs6Loo3U74ZEQ7zW8U8I1FtRk-Apz_myg68Tk02sgITzuSCWJ0vFmu7ZiHAXWcVH68hiuhhOV8OYWHxESPyn_k-BzLwT40bbCz1fzDT7fhIwgz4rShVZzDwuXJyCB8X_lj5GICldC0bF_4tjLms9O89cSlJqXpb85Qc1Jje4Vl2vPX6NAj_coB93NTGsXyPlPRgqss6fH7hrE5yc0I2BXD9kIV_WPq7GVMTStbEg3j20NIXBhDtyW70o'
  },
  {
    id: 'g2',
    title: 'Configuración de Redes LAN',
    category: 'Redes',
    date: '2024-10-12',
    description: 'Práctica presencial sobre ponchado de cables y configuración de switches para redes de área local institucionales.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBldUkyM5pLAbDmIjteHHZWlESjG_ZmBLWMTU3AvXlDkp4bt71GbXlRvJXQqPSz-aAYV0xaBj6WSyw9Om9VLYig6muEwSR1HaYUGlVHRKIA_ILlBlQyXbtPwAZKdI1ee_fmcMbJa38KJJY2YVe5ttMQ4iLpACCn-xLWyUU8awTcF3M3eP4UQxrUtPZWGD7waXHRyyzX4RGBMw_eXyATdZVBh0ywbMfWehQhVA13_LqsBoAXsZNiJwowf3W79oSRzHEPaAYW5LdSl5I'
  },
  {
    id: 'g3',
    title: 'Feria Científica y Tecnológica 2024',
    category: 'Eventos',
    date: '2024-09-05',
    description: 'Exposición anual de proyectos finales donde los estudiantes muestran sus innovaciones en software y hardware a la comunidad.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJvrqY_BFNsbbssv9Te8S8j7UexdHgwyY1F32mlXUM41eFo4EQD8G6ODKCWdZXeCti18DvmdIhdzamJ-4ScaIX4Wr-p5OON0ZmxCN4o1Ym6cUtXfD9H5RdL4gu1WOKiNPrXWt541ieCrQQVutZQepKdjsoGrMgijvn7L0DNwM1r0kF31sToEz5WGbt-Llbrnea4m9AKFCMUfjou65SmX_o8kKfbjOdMrQZptkp3r6vY0YzYS9-kqEXtX3JwBIi7Yv3ZlPaivj0ouI'
  },
  {
    id: 'g4',
    title: 'Producción Audiovisual Institucional',
    category: 'Producciones Digitales',
    date: '2024-08-28',
    description: 'Taller de creación de contenidos digitales para las plataformas oficiales del CEMG Álvaro Contreras.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhqtE8UYBVET1LQGj5IL6k4nGXoXZ1VR-kxm1BsTvL2UPkKoX9sJpEv3e3SE3kZhiKZsstBG-4dXyLP0C3gOhE9khrqRlf0_ic7BzrHa5Oe524wJFzd5uWbriBKzoZiwJypxx0YYsGGMxeq26IZL83dpEXDV_Mna2j4deczNhb2g2CmvHZddLJvpWQNs1tdBh-uTarsBpK19koEgKbZzYcJ3yYy7tJwzLhCnszBb3wUY6toL-u_ObDSWA1SqrDugy-XmfZR6YOD0Q'
  },
  {
    id: 'g5',
    title: 'Capacitación en Programación',
    category: 'Desarrollo Web',
    date: '2024-08-15',
    description: 'Sesión intensiva de algoritmos y lógica de programación utilizando frameworks modernos de desarrollo web.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCPCWWmzgqgasQ0L996x_gNZQA6ATqbcSonfIAwv3zfX1czQ_GrWWF0iiLlPtfGHPnbvKjcPlXdxpOiBejPTymkf_Ix1IRSoI8PVehN4fpGoIS-1BFgzmtCyHfC_2GTqLRt0ZhmjWzx6XnJon0PVnTn5LgiEvPb0X3iFGcc3RkUUGhzGeF4oqBF4uQ0aAgA0RGpAo96BAb5Z9l4AI0iSxlB4kZztOSOtxnHYEMRu4h38LasWm9imdg8vBrkwjLlXkVV9bBf_zF5Ms'
  },
  {
    id: 'g6',
    title: 'Clase Magistral: Arquitectura de Servidores',
    category: 'Laboratorios',
    date: '2024-08-02',
    description: 'Conferencia impartida por expertos de la industria sobre la infraestructura tecnológica de centros de datos.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqap6f2qSHiV4iQdXjq_b-iay29Bo4QdiRjgWZ1G1ToD2HtWjukYKoCTmTgmsO8T9MT3NxmVIFmuqDhu22gBuhtkruWsHGqwUHnHh03Vcv222haQuNSO140DC5QTIK1ZUAprIJ-u4X_pjiV14Ur0nAZetmFaY4n-wZgsSk1tLl5OTI3UcCglAYOEeWpeaCL2BjOfZRjByABL3soaVA0-A8e_ZIH7HcXnKPal026xugNj-TD3fDFswZ8pj2DDsTxB1JOQsCXIhn_TA'
  }
];

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 's1',
    name: 'Programación II',
    area: 'Programación',
    semester: 'II Semestre',
    description: 'Dominio de lógica avanzada, implementación de bases de datos relacionales y consumo de APIs para aplicaciones modernas.',
    icon: 'terminal',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZOB5nxjkM-fXS0tPRyR3opCL_iGwd_sBkcEqBA-VuHoxiBWOdmEGJvtQlLyUB7YPgggnWj_P34VSyWc2_MeqOCYJ4MCeExeB2cnzhIGeSpQ2pLPP99pXFvq1Tk6GxSPrrJTNVophb--RXb4LWTBrnQ9DJ936WcPOhsqTEaaSw5smAWnhcoUpX85nI8gk-KW5zSpvZMIypMERGPaGcHHu6XvGZ-cjZHjh92w726em7fM-GVxby12vN0HLfrI7JnlI2N-PDLpqKf_I',
    resources: [
      { id: 'r1_1', name: 'Manual de Programación en C++.pdf', type: 'PDF', size: '4.5 MB', area: 'Programación', date: '2024-10-20' },
      { id: 'r1_2', name: 'Guía Práctica de SQL Server.docx', type: 'DOCX', size: '2.1 MB', area: 'Programación', date: '2024-10-18' }
    ]
  },
  {
    id: 's2',
    name: 'Redes Informáticas',
    area: 'Redes',
    semester: 'I Semestre',
    description: 'Estudio profundo de modelos OSI/TCP-IP, configuración de equipos Cisco y diseño de subredes para entornos empresariales.',
    icon: 'dns',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQSZRKdUWhQKdJOGAR0FGZF_EI1tnncJnuStqSmMvsRsTWWLKoBL9OegZYb2Y8xUHO08E99OtNT_J_suS1IuftBY8bl7861N1aMtw1sU5oMUcUJwX0ZZ1K2iDij0rPCbX-Yk994TK0kT6kwm0La3lfdGI-_iaTOx3VS1KmaUUc2_-8mUzdPsK5qZLshCGha38W5mK4o_d7_MUhuYrshjZt9hlPwAULRRlOF9kpbnrjqYdGCXPFr0zxKz6f03Q6Zi8wnIQT6Tjovms',
    resources: [
      { id: 'r2_1', name: 'Guía de Subnetting Avanzado.pdf', type: 'PDF', size: '3.2 MB', area: 'Redes', date: '2024-10-15' },
      { id: 'r2_2', name: 'Guía de Comandos Básicos Cisco.docx', type: 'DOCX', size: '1.2 MB', area: 'Redes', date: '2024-10-10' }
    ]
  },
  {
    id: 's3',
    name: 'Mantenimiento y Reparación',
    area: 'Hardware',
    semester: 'I Semestre',
    description: 'Diagnóstico de fallas en componentes físicos, ensamble de equipos y protocolos de mantenimiento preventivo y correctivo.',
    icon: 'build',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhbTsuaQGCE9UmGXSbU723r6vxNEG39a0dlVqMsg9ztNGarFzBn0UUDUIq5MjYA9-DEhxMyREXZ1Dz6yXC3t3LTBP4LYHTSlWS8eO9MHsPxwHokFJlFcmtKxXkMZpI3MVfJJ1mGaiU89dzkRvJAhmLkmnXBucwIEDKNpTI-zlKQGLBZEf1DZtesJ-K1ZOmhRCvu6kGSpMdSrIlA-qjFF2qA5kSwf8UtyicdaAPtioTF0_t-uaPJT2NBwriw13yIx82tli7-qdRup4',
    resources: [
      { id: 'r3_1', name: 'Manual de Ensamble y Diagnóstico.pdf', type: 'PDF', size: '8.1 MB', area: 'Hardware', date: '2024-09-28' },
      { id: 'r3_2', name: 'Checklist de Mantenimiento Preventivo.xlsx', type: 'XLSX', size: '450 KB', area: 'Hardware', date: '2024-09-25' }
    ]
  },
  {
    id: 's4',
    name: 'Desarrollo Web',
    area: 'Programación',
    semester: 'II Semestre',
    description: 'Creación de sitios dinámicos utilizando HTML5, CSS3, JavaScript y arquitectura de servidor con PHP y MySQL.',
    icon: 'devices',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkNK_6AoX-xBjMduZ47v-LfeEBHAA269QlZTlwGG75qqmn6rAzdYeWYxIxWAQfPBsNdPDai8wElQK8KLS8Mv2TdxCNdkl4ibtzrJepNOoIkwEgS5gaAEjdHvq0ycIti1E49n5mTRiBPC6asqRCO-BNqcVvwCa4SDzJyYy3k7ihbbKLwn-7pfw-tCsq-4BMXWy7DY6zquGaFXpHK3GPsZv1N7-G3yGa1ps2-7LxuRhV0G2YhH0syhxA_nfoeWVKH6reNZtskjczOw8',
    resources: [
      { id: 'r4_1', name: 'Manual de PHP Seguro.docx', type: 'DOCX', size: '1.8 MB', area: 'Programación', date: '2024-10-12' },
      { id: 'r4_2', name: 'Ejercicios Básicos de Javascript.zip', type: 'ZIP', size: '5.4 MB', area: 'Programación', date: '2024-10-05' }
    ]
  },
  {
    id: 's5',
    name: 'Producciones Digitales',
    area: 'Diseño Gráfico',
    semester: 'I Semestre',
    description: 'Edición avanzada en Photoshop e Illustrator, post-producción audiovisual y fundamentos de diseño multimedia.',
    icon: 'palette',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACeMkGAiNwXi7Ese94hPGaggKp92Q5M__LVVlQpKg8Uxfk7UXFDSs3aPovb_9npfKImxV3dTy1A0g9eqrh9X2BE02jME2AwtMcgecDVa-yIbuLujKSpY3tLKtQmCSnSPOj1syMtrWIorrAt1w2frS0xXegsXi5u2jDI7NmaIjGLZDnGRh16CHNwl0ELVJ5uj_OA9zW6ctzCfMmqp4749NWof0_NOr7WGfoW2Q1CZ8aKu54UCpwhBCW0H6_tQoprOj_r1b8AbnNSlQ',
    resources: [
      { id: 'r5_1', name: 'Guía de Proporciones y Paletas de Color.pdf', type: 'PDF', size: '6.7 MB', area: 'Diseño Gráfico', date: '2024-09-18' },
      { id: 'r5_2', name: 'Recursos y Pinceles para Photoshop.zip', type: 'ZIP', size: '14.2 MB', area: 'Diseño Gráfico', date: '2024-09-15' }
    ]
  },
  {
    id: 's6',
    name: 'Gestión Empresarial',
    area: 'Gestión',
    semester: 'II Semestre',
    description: 'Gestión de proyectos tecnológicos, ética profesional en TI y fundamentos de emprendimiento digital.',
    icon: 'assignment',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYNUOSNhaXL-94I_C_BySa9ADKKE7qBcPLYAhk2ljq-dKHQwUGkpXPQaaMGbkeiTeDwWbNCxzVO4fumotDGW5UcL0NdDXoYNc4lpLU1lnRfL1BQf7RGq-vVGMpzIcwE3QybXHEQ_01T2uo8C6DNGjCjZozWuovmKyphVKeW49D-d4PW1z8_urWwr6rWGJ7PTCyfaNu2KirkDRTC7kIevRFrrEzihCahkfS5JN8KgJwj5RiUx2vR4LLusBu1HlXpJlRebw8AQ4gFIo',
    resources: [
      { id: 'r6_1', name: 'Plantilla de Plan de Proyecto Final.docx', type: 'DOCX', size: '850 KB', area: 'Gestión', date: '2024-10-02' },
      { id: 'r6_2', name: 'Ética y Leyes de TI en Honduras.pdf', type: 'PDF', size: '2.4 MB', area: 'Gestión', date: '2024-09-20' }
    ]
  }
];

export const INITIAL_SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'ss1',
    name: 'David López',
    title: 'Founder of TechNova Solutions',
    role: 'Emprendedor Tecnológico',
    story: 'Tras graduarse, David fundó una de las startups de desarrollo de software más innovadoras del país. Especializada en soluciones personalizadas para PYMES, su empresa ahora emplea a más de 20 programadores egresados del CEMG Álvaro Contreras.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAl0yi0juLRaEWB3W-PYpECNHXpY8SlHYzObiEcmzR4U-JGu7XvkLhBc-h1QHGTXaya58pBOUDWdU51w6IUUzprT4Q3OBM8kI-Fvs1Ahkso1rwvSiF3SP9uZTHJRQHIJLFqhTbFuyzyH375CR7nkHhdOIWvHYVWKhrbs8KDkaYSI1IhKnLN7lGgsXCq5SqZaNeqyARgOMIReAlstwaSrUibtf0-ehvExQTyfEFD-kS7EeXVSYqpk3BsYs_FlB6Drkjy2fqKpBZN-E4',
    category: 'Emprendimiento',
    approved: true,
    date: '2024-06-15'
  },
  {
    id: 'ss2',
    name: 'Elena Rodríguez',
    title: 'Senior Software Engineer',
    role: 'Cloud Specialist',
    story: 'Experta en Cloud Computing en una firma tecnológica de alcance global. Elena ha liderado la migración de infraestructuras críticas hacia entornos híbridos y es una ferviente defensora de la inclusión de la mujer en las carreras STEM.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJEsCvnWP5FIMhcqQOwpLcZefmMikscj8Unnc0mPzkvC2KZkL1U9Bn9_gTMbOn3r7jkC16nLQ5M-yqu0kiEWy19Xv932fd4TdFdiR4WJTHH8VUbUXgJ9zWleEkc3qo-ZemzLiMmxBpO5glNFI4H7zWLjhJ1krJYZrYt0kicf8yr69Hzo_RAtnrxZoXwyho5w1b3hdAvGfqSfwPbm6c_4PAVKJRLyPHijYjS8luLI8qnK5keGVypkJqzF4CFEIr6E3ICiJwVd-Qd6U',
    category: 'Ingeniería Cloud',
    approved: true,
    date: '2024-05-10'
  },
  {
    id: 'ss3',
    name: 'Miguel Ruiz',
    title: 'IT Infrastructure Manager',
    role: 'Infra Manager',
    story: 'Responsable de la seguridad y estabilidad tecnológica de un importante banco regional. Su gestión ha sido clave para la implementación de nuevos de ciberseguridad y la modernización de los centros de datos bancarios.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJRyRq6Uyuq84qYQkrXfsnLWNH51rGSmQx7wkSra4ZrUww0nN1EGlJ0ryUv7YC86tB98zl27t6mtb5gtXznzkVuw491s2xvtqRegKyBwizb5DDr_M8rdQS46jU6Boj1oi214QadWPbxN1IcfCrkuvP3FLT5bxVheoTpA8XlJJY0uJc3baorLdnd_q9hCtMWm23XkzrkOmUBxIfisuNXP4sybeN06HBwmDP_KYdDGR-iIMo-4Xrz9zaJToNy3MXee0Wju_BGgJOVyE',
    category: 'Ciberseguridad',
    approved: true,
    date: '2024-04-20'
  }
];

export const INITIAL_HONOR_ROLL: HonorStudent[] = [
  {
    id: 'hs1',
    name: 'Carlos Mendoza',
    grade: 'BTP Informática 2-1',
    average: 98,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdYSXD3w1Bg0J-HMto0aOr5XpOypO4QfV_M2fkkI0UjbgxqtNMN56G98TJiQ3nvM-37D4z2pgeKaCLLyVtyepBe9Fd7SmzBLtNGAn-jhFNAtpvl45Ir3oFwrDY0gye_HOun_a8MH1rJqCpP4HEZ1rbl7IZpRzp6Jo63F31lhdqRDr-Oc0Dhmr5ceaKekIGEoj6sHHojCa1IbG3_sy57mWL36lmE5RSXfGnjH-BvEjCagsn4mosRbCSZj5oeyJp7sTz7-P_lFJWdPI',
    rank: 1
  },
  {
    id: 'hs2',
    name: 'Ana Valladares',
    grade: 'BTP Informática 3-2',
    average: 97,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhHKBiioqEDDxlSlOqvr3klP8QYEGhZrEHBKg15UWYANvdoZrQJpUd_maniT18AGQBpLybwy-X6734NbsFifl6zpCUUE2WbsmqlyqPv9m9D-j31rtSGGq6PetlaLXC972iW2INVFrvoZc_qMDalcLBBSpigGNsyMcK80HA0KcOmkTMQu9R2OteSR578w5cv9um3PjYE2Z4MHn7WKFjlGi-y4UAdbWPj46N0OCAJNc-gMgX2s18H6RCiF3oMAsSK58XpoxSYQjpnmg',
    rank: 2
  },
  {
    id: 'hs3',
    name: 'Roberto Sosa',
    grade: 'BTP Informática 2-1',
    average: 96,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp_tIKQpmvI9UJds0NSv1aGg_jZKFjxzGVyALSX_uz9kDV92V89aVLC0wNkIri3FAbQJnYGhbo78qYyH8fuzv3RuN7q_xad9siRNOphai0Qj8UCKsr8OUm9FJk_6suut1Gxzsivi0-gQ77HiXwZ9DxWJE1wJK3fJOxaBzkdg8p1KDgl_72tpEGz8leU-jBdphcfKrlSSN5Up1vc7L0mnrClVT7lqNdnA0Bra2_bg3zLpFinfW8PdewdbFylX81QU58Xl8grKGEb6M',
    rank: 3
  }
];

export const INITIAL_STATS: PortalStats = {
  studentsCount: 482,
  teachersCount: 24,
  awardsCount: 12,
  laboratoriesCount: 3
};

export const INITIAL_COMPANIES: PartnerCompany[] = [
  { id: 'c1', name: 'TechCorp', icon: 'corporate_fare' },
  { id: 'c2', name: 'CiberSistemas', icon: 'memory' },
  { id: 'c3', name: 'RedesLocales', icon: 'lan' },
  { id: 'c4', name: 'DataHonduras', icon: 'database' }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'Admisiones Abiertas',
    message: 'Se informa a toda la comunidad que las pre-matrículas para el período académico 2026 están abiertas. Favor presentar la documentación respectiva.',
    date: '2026-01-10',
    targetAudience: 'Todos',
    sentBy: 'Administrativo'
  },
  {
    id: 'n2',
    title: 'Capacitación en Programación React y TypeScript',
    message: 'Invitación a todos los docentes del BTP en Informática a participar en el taller de tecnologías web modernas este fin de semana.',
    date: '2024-10-20',
    targetAudience: 'Docentes',
    sentBy: 'Director de Informática'
  }
];

export const INSTITUTIONAL_INFO = {
  name: 'CEMG Álvaro Contreras',
  history: 'Comprometidos con la educación pública de calidad desde el corazón de Santa Rosa de Copán. Formando la próxima generación de líderes en informática.',
  address: 'Santa Rosa de Copán, Honduras. Barrio El Centro.',
  phone: '+504 2662-1024',
  email: 'info@cemgalvarocontreras.edu.hn',
  vision: 'Convertirnos en el referente regional de educación técnica superior, impulsando la innovación desde el occidente de Honduras hacia el mundo.',
  careerDescription: 'Nuestra misión es formar profesionales técnicos integrales con competencias en desarrollo de software, soporte y redes, capaces de liderar la transformación digital en Santa Rosa de Copán.'
};
