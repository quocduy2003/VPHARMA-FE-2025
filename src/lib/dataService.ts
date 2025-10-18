const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export async function fetchAPI(endpoint : string){
    try{
      console.log(`Fetching API: ${API_URL}/${endpoint}`);
       const response = await fetch(`${API_URL}/${endpoint}`) 
       if (!response.ok) {
           throw new Error(`Failed to fetch: ${endpoint}`);
       }
       return await response.json();
    } catch (error: any) {
      //Trả lỗi chi tiết 

       console.error('Error fetching API:', error.message);
       throw error;
    }
}

export function populateQuery(levels: string[]): string {
  if (levels.length === 0) return '';

  const MEDIA_FIELDS = ['image', 'images', 'media', 'thumbnail', 'icon', 'logo'];
  let query = 'populate';

 
  const hasEmptyMedia = levels[levels.length - 1] === '';
  // Clean levels if last is ''
  const cleanedLevels = hasEmptyMedia ? levels.slice(0, -1) : levels;

  cleanedLevels.forEach((level, index) => {
    query += `[${level}]`;

    const isLast = index === cleanedLevels.length - 1;
    const isMediaField = MEDIA_FIELDS.includes(level.toLowerCase());

    if (!isLast || isMediaField) {
      query += `[populate]`;
    }
  });

  // If has '' at the end, add one more populate
  if (hasEmptyMedia) {
    query += `[populate]`;
  }

  query += '=*';
  return query;
}
  export function combinePopulate(paths: string[][]): string {
    return paths.map(populateQuery).join("&");
  }