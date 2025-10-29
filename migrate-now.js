import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yqdcukalrdfkptutayve.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZGN1a2FscmRma3B0dXRheXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0OTcxMzksImV4cCI6MjA3NzA3MzEzOX0.9LAKBWLds9Js81dCo_L8yScQfrq8tLWntWRnOf2T5tg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('🚀 بدء نقل البيانات...\n');

async function migrateCategories() {
  console.log('📁 إنشاء الفئات...');

  const categories = [
    { name_en: 'Streaming Services', name_ar: 'خدمات البث', slug: 'streaming', icon: '📺', description_en: 'Compare streaming platforms', description_ar: 'مقارنة منصات البث' },
    { name_en: 'Technology', name_ar: 'التكنولوجيا', slug: 'tech', icon: '💻', description_en: 'Compare tech products', description_ar: 'مقارنة المنتجات التقنية' },
    { name_en: 'Travel', name_ar: 'السفر', slug: 'travel', icon: '✈️', description_en: 'Compare travel services', description_ar: 'مقارنة خدمات السفر' },
    { name_en: 'Lifestyle', name_ar: 'نمط الحياة', slug: 'lifestyle', icon: '🏃', description_en: 'Compare lifestyle choices', description_ar: 'مقارنة خيارات نمط الحياة' },
    { name_en: 'Shopping', name_ar: 'التسوق', slug: 'shopping', icon: '🛒', description_en: 'Compare shopping platforms', description_ar: 'مقارنة منصات التسوق' }
  ];

  const { data, error } = await supabase
    .from('categories')
    .upsert(categories, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error('❌ خطأ في إنشاء الفئات:', error.message);
    return null;
  }

  console.log(`✅ تم إنشاء ${data.length} فئات\n`);
  return data;
}

async function getCategoryMap() {
  const { data } = await supabase.from('categories').select('id, slug');
  const map = {};
  if (data) {
    data.forEach(cat => { map[cat.slug] = cat.id; });
  }
  return map;
}

async function migrateProducts() {
  console.log('🎯 نقل المنتجات...');

  const categoryMap = await getCategoryMap();

  const products = [
    { name_en: 'Netflix', name_ar: 'نتفليكس', slug: 'netflix', category: 'streaming', logo_url: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=200', image_url: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=800', primary_color: '#E50914', base_score: 88, price_range: 'medium', description_en: 'Leading streaming service with vast content library', description_ar: 'خدمة البث الرائدة مع مكتبة محتوى ضخمة', pros: ['Largest content library', 'Original content', 'User-friendly interface', 'Available worldwide'], cons: ['Price increases', 'Content rotation', 'No live TV'] },
    { name_en: 'Disney+', name_ar: 'ديزني بلس', slug: 'disney-plus', category: 'streaming', logo_url: 'https://images.pexels.com/photos/19023044/pexels-photo-19023044.jpeg?auto=compress&cs=tinysrgb&w=200', image_url: 'https://images.pexels.com/photos/19023044/pexels-photo-19023044.jpeg?auto=compress&cs=tinysrgb&w=800', primary_color: '#113CCF', base_score: 85, price_range: 'low', description_en: 'Family-friendly streaming with Disney, Marvel, and Star Wars', description_ar: 'منصة بث عائلية تضم ديزني ومارفل وستار وورز', pros: ['Family content', 'Affordable price', 'Marvel & Star Wars', '4K quality'], cons: ['Limited adult content', 'Smaller library', 'Less variety'] },
    { name_en: 'HBO Max', name_ar: 'إتش بي أو ماكس', slug: 'hbo-max', category: 'streaming', logo_url: 'https://images.pexels.com/photos/19023048/pexels-photo-19023048.jpeg?auto=compress&cs=tinysrgb&w=200', image_url: 'https://images.pexels.com/photos/19023048/pexels-photo-19023048.jpeg?auto=compress&cs=tinysrgb&w=800', primary_color: '#6B2FF7', base_score: 86, price_range: 'medium', description_en: 'Premium content with HBO originals', description_ar: 'محتوى متميز مع أفلام HBO الأصلية', pros: ['Premium shows', 'HBO originals', 'Warner Bros content', 'Quality over quantity'], cons: ['Higher price', 'Smaller library', 'Limited availability'] },
    { name_en: 'iPhone', name_ar: 'آيفون', slug: 'iphone', category: 'tech', logo_url: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=200', image_url: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800', primary_color: '#000000', base_score: 92, price_range: 'high', description_en: 'Premium smartphone with iOS ecosystem', description_ar: 'هاتف ذكي متميز مع نظام iOS', pros: ['Best camera quality', 'Premium build', 'iOS ecosystem', 'Long support', 'Resale value'], cons: ['Expensive', 'Limited customization', 'No expandable storage'] },
    { name_en: 'Samsung Galaxy', name_ar: 'سامسونج جالاكسي', slug: 'samsung-galaxy', category: 'tech', logo_url: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=200', image_url: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800', primary_color: '#1428A0', base_score: 90, price_range: 'medium', description_en: 'Flagship Android smartphone', description_ar: 'هاتف أندرويد رائد', pros: ['Great display', 'Versatile camera', 'Expandable storage', 'Good battery', 'More affordable'], cons: ['Bloatware', 'Slower updates', 'Resale value lower'] },
    { name_en: 'Mac', name_ar: 'ماك', slug: 'mac', category: 'tech', logo_url: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=200', image_url: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800', primary_color: '#000000', base_score: 89, price_range: 'high', description_en: 'Apple computers', description_ar: 'أجهزة كمبيوتر آبل', pros: ['Premium build', 'macOS ecosystem', 'Retina display', 'Long battery', 'Resale value'], cons: ['Very expensive', 'Limited ports', 'Not upgradeable'] },
    { name_en: 'PC', name_ar: 'كمبيوتر شخصي', slug: 'pc', category: 'tech', logo_url: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=200', image_url: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800', primary_color: '#0078D4', base_score: 86, price_range: 'medium', description_en: 'Windows PC', description_ar: 'كمبيوتر يعمل بويندوز', pros: ['More affordable', 'Upgradeable', 'Gaming support', 'Software variety'], cons: ['Build quality varies', 'Bloatware', 'Updates intrusive'] },
    { name_en: 'PlayStation', name_ar: 'بلايستيشن', slug: 'playstation', category: 'tech', logo_url: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=200', image_url: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=800', primary_color: '#003087', base_score: 91, price_range: 'high', description_en: 'Sony gaming console', description_ar: 'وحدة ألعاب سوني', pros: ['Exclusive games', 'Strong hardware', 'VR support', 'Great controller'], cons: ['Expensive games', 'Storage limited', 'Online required'] },
    { name_en: 'Xbox', name_ar: 'إكس بوكس', slug: 'xbox', category: 'tech', logo_url: 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&cs=tinysrgb&w=200', image_url: 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&cs=tinysrgb&w=800', primary_color: '#107C10', base_score: 89, price_range: 'high', description_en: 'Microsoft gaming console', description_ar: 'وحدة ألعاب مايكروسوفت', pros: ['Game Pass value', 'Backward compatible', 'Quick Resume', 'PC integration'], cons: ['Fewer exclusives', 'Controller batteries', 'Storage expensive'] }
  ];

  const productsToInsert = products.map(p => ({
    name_en: p.name_en,
    name_ar: p.name_ar,
    slug: p.slug,
    category_id: categoryMap[p.category],
    logo_url: p.logo_url,
    image_url: p.image_url,
    primary_color: p.primary_color,
    base_score: p.base_score,
    price_range: p.price_range,
    description_en: p.description_en,
    description_ar: p.description_ar,
    pros: JSON.stringify(p.pros),
    cons: JSON.stringify(p.cons),
    specs: JSON.stringify({})
  }));

  const { data, error } = await supabase
    .from('products')
    .upsert(productsToInsert, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error('❌ خطأ في نقل المنتجات:', error.message);
    return;
  }

  console.log(`✅ تم نقل ${data.length} منتج\n`);

  data.forEach(p => {
    console.log(`   ✓ ${p.name_ar} (${p.name_en})`);
  });
}

async function checkData() {
  console.log('\n📊 التحقق من البيانات...\n');

  const { data: categories } = await supabase.from('categories').select('*');
  console.log(`📁 الفئات: ${categories?.length || 0}`);

  const { data: products } = await supabase.from('products').select('*');
  console.log(`🎯 المنتجات: ${products?.length || 0}`);

  const { data: battles } = await supabase.from('battle_results').select('*');
  console.log(`⚔️  المعارك: ${battles?.length || 0}`);
}

async function main() {
  try {
    await migrateCategories();
    await migrateProducts();
    await checkData();

    console.log('\n✅ تم نقل جميع البيانات بنجاح!\n');
    console.log('🌐 افتح المتصفح على: http://localhost:3000/ai-battle.html');
    console.log('🌐 أو بالعربية: http://localhost:3000/ar/ai-battle.html\n');

    process.exit(0);
  } catch (err) {
    console.error('❌ خطأ:', err.message);
    process.exit(1);
  }
}

main();
