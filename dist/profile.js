import {calculate,validateRecord} from './rules.js';

export const DEFAULT_GOAL=90;
export const RULESET='cesar-school-manual-fornecido-v1';

export const COURSES=[
  {id:'ciencia-computacao',name:'Ciência da Computação',group:'Cursos de Bacharelado',goal:120,aliases:[]},
  {id:'sistemas-informacao',name:'Sistemas de Informação',group:'Cursos de Bacharelado',goal:120,aliases:[]},
  {id:'design',name:'Design',group:'Cursos de Bacharelado',goal:120,aliases:[]},
  {id:'adm-tech',name:'ADM Tech',group:'Cursos de Bacharelado',goal:120,aliases:[]},
  {id:'ads',name:'Análise e Desenvolvimento de Sistemas (ADS)',group:'Cursos Tecnológicos',goal:90,aliases:['ADS','Análise e Desenvolvimento de Sistemas']},
  {id:'ciberseguranca',name:'Segurança da Informação (Cibersegurança)',group:'Cursos Tecnológicos',goal:90,aliases:['Segurança da Informação','Cibersegurança']},
  {id:'bancos-dados-ia',name:'Bancos de Dados e IA',group:'Cursos Tecnológicos',goal:90,aliases:[]},
  {id:'gti',name:'Gestão da Tecnologia da Informação (GTI)',group:'Cursos Tecnológicos',goal:90,aliases:['GTI','Gestão da Tecnologia da Informação']}
];

const normalizeCourse=name=>name.trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').replace(/\s+/g,' ');

export function findProfileCourse(profile){
  if(!profile)return null;
  if(profile.courseId)return COURSES.find(course=>course.id===profile.courseId)||null;
  if(typeof profile.course!=='string')return null;
  const name=normalizeCourse(profile.course);
  return COURSES.find(course=>[course.name,...course.aliases].some(alias=>normalizeCourse(alias)===name))||null;
}

export function createCourseProfile(name,courseId){
  const course=COURSES.find(course=>course.id===courseId);
  if(!course)throw Error('Selecione um curso da lista.');
  if(typeof name!=='string'||!name.trim()||name.trim().length>100)
    throw Error('Informe um nome válido (até 100 caracteres).');
  return {name:name.trim(),course:course.name,courseId:course.id,goal:course.goal};
}

export function validateProfile(value){
  if(!value||typeof value!=='object')throw Error('Preencha seu perfil para continuar.');
  if(Object.hasOwn(value,'courseId'))return createCourseProfile(value.name,value.courseId);
  // Perfis anteriores à lista de cursos continuam válidos, sem perda de dados.
  for(const [field,label,max] of [['name','nome',100],['course','curso',150]]){
    if(typeof value[field]!=='string'||!value[field].trim()||value[field].trim().length>max)
      throw Error(`Informe um ${label} válido (até ${max} caracteres).`);
  }
  if(typeof value.goal!=='number'||!Number.isFinite(value.goal)||value.goal<=0||value.goal>10000||Math.abs(value.goal*100-Math.round(value.goal*100))>0.000001)
    throw Error('Informe uma meta maior que zero, até 10.000 horas, com no máximo duas casas decimais.');
  return {name:value.name.trim(),course:value.course.trim(),goal:value.goal};
}

export function summarize(records,profile){
  const {goal}=validateProfile(profile);
  const calculation=calculate(records);
  return {...calculation,goal,remaining:Math.max(0,Math.round((goal-calculation.totals.approved)*100)/100),projectedRemaining:Math.max(0,Math.round((goal-calculation.total)*100)/100),percent:Math.min(calculation.totals.approved/goal*100,100)};
}

export function createBackup(records,profile){
  return {version:2,ruleSet:RULESET,profile:validateProfile(profile),exportedAt:new Date().toISOString(),records};
}

export function restoreBackup(data,currentProfile=null){
  if(!data||![1,2].includes(data.version)||!Array.isArray(data.records)||data.records.length>2000)
    throw Error('Formato de backup incompatível.');
  let profile;
  if(data.version===1){
    if(data.goal!==DEFAULT_GOAL)throw Error('Meta incompatível com o formato antigo de backup.');
    // O formato antigo não tinha perfil. Preserve o perfil atual, quando existir.
    profile=currentProfile?validateProfile(currentProfile):null;
  }else{
    if(data.ruleSet!==RULESET)throw Error('O backup utiliza um conjunto de regras diferente.');
    profile=validateProfile(data.profile);
  }
  const ids=new Set();
  data.records.forEach(record=>{
    validateRecord(record);
    if(ids.has(record.id))throw Error('O backup contém atividades duplicadas.');
    ids.add(record.id);
  });
  calculate(data.records);
  return {records:data.records,profile};
}
