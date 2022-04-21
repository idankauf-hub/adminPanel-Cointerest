

export const tweetsColumns = [
  
  {
    field: "tweet_id",
    headerName: "Tweet ID",
    width: 180,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.Image} alt="avatar" />
          {params.row.Username}
        </div>
      );
    },
  },
  {
    field: "author",
    headerName: "Author",
    width: 130,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.Email}
        </div>
      );
    },
  },
  {
    field: "comp_score",
    headerName: "Comp Score",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.Email}
        </div>
      );
    },
  },
  {
    field: "engagement",
    headerName: "Engagement",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.Email}
        </div>
      );
    },
  },
  {
    field: "tweet_text",
    headerName: "Tweet Text",
    width: 380,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.Email}
        </div>
      );
    },
  },
  {
    field: "tweet_time",
    headerName: "Tweet Time",
    width: 180,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.Email}
        </div>
      );
    },
  },
  

];

export const userColumns = [
  
  {
    field: "user",
    headerName: "User",
    width: 280,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.Image} alt="avatar" />
          {params.row.Username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 280,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.Email}
        </div>
      );
    },
  },
  

];

export const coinsColumns = [
  
  {
    field: "coin",
    headerName: "Coin",
    width: 380,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.Coin_picture} alt="avatar" />
          {params.row.Coin_name}
        </div>
      );
    },
  },
  {
    field: "info",
    headerName: "Info",
    width: 380,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.Coin_info}
        </div>
      );
    },
  },
  

];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "safdsfsfsdffffffffffffffff",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];
