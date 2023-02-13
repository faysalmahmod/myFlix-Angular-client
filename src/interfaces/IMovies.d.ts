interface IMovie {
  "_id": string
  "Title": string;
  "Description": string;
  "Genre": IGenre;
  "Director": IDirector;
  "ImagePath": string;
  "Featured": true;
}

interface IDirector {
  "Name": string;
  "Bio": string;
  "Birth"?: string;
  "Death"?: string;
}

interface IGenre {
  "Name": string;
  "Description": string;
}