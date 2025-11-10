export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const validatePhoneNumber = (number) => {
  const reg = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/; // /^[0]?[789]\d{9}$/;
  return reg.test(number);
};

export const SECTION_LIST_MOCK_DATA = [
    {
      title: 'Appetizers',
      data: [
        {
          id: '1',
          title: 'Pasta',
          price: '10',
          description: "Home made pasta with tomatos.",
          image: "",
        },
        {
          id: '3',
          title: 'Pizza',
          price: '8',
          description: "Classic Naples pizza with macarella and basil.",
          image: "",
        },
      ],
    },
    {
      title: 'Salads',
      data: [
        {
          id: '2',
          title: 'Caesar',
          price: '2',
          description: "Home made pasta with tomatos.",
          image: "",
        },
        {
          id: '4',
          title: 'Greek',
          price: '3',
          description: "Home made pasta with tomatos.",
          image: "",
        },
      ],
    },
  ];

export function getSectionListData(data) {
  // SECTION_LIST_MOCK_DATA is an example of the data structure you need to return from this function.
  // The title of each section should be the category.
  // The data property should contain an array of menu items. 
  // Each item has the following properties: "id", "title" and "price"
  let sectionListData = [
    {title: 'Appetizers', data: []}, 
    {title: 'Salads', data: []}, 
    {title: 'Beverages', data: []}
  ];

  console.log(">>>", data);
  for (let i = 0; i < data.length; i++) {;
    const data_o = data[i];
    var dataAdded = false;
    for (let j = 0; j < sectionListData.length; j++) {
      if(sectionListData[j].title === data_o.category) {
        sectionListData[j].data = [...sectionListData[j].data, {
          id: data_o.id, 
          title: data_o.title, 
          price: data_o.price,
          description: data_o.description,
          image: data_o.image,
        }];
        dataAdded = true;
        break;
      }
    }  
    if (!dataAdded) {
      console.log(">", data_o);
      sectionListData = [...sectionListData, 
        {title: data_o.category, 
          data: [{id: data_o.id, 
            title: data_o.title, 
            price: data_o.price,
            description: data_o.description,
            image: data_o.image,
      }]}];
    }
  }
  return sectionListData;
}