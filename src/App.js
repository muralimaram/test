import "./styles.css";
import { CSVReader } from "react-papaparse";

export default function App() {
  const handleOnDrop = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");

    let newData = [];
    for (let i = 0; i < data.length; i++) {
      newData.push(data[i].data);
    }

    function convert(obj) {
      const result = {};
      Object.keys(obj).forEach(function (key) {
        result[key.replace(/\s/g, '_').replace(/#/g,'number').replace(/[^0-9.-]+/g,"").replace(/(#N\/A)/g, 0).toLowerCase()] = obj[key];
      });
    
      return result;
    }
    
    
    var result = newData.map(function (o) {
        return convert(o);
    });

    
    function convertIntObj(obj) {
      const res = {}
      for (const key in obj) {
        res[key] = {};
        for (const prop in obj[key]) {
          const parsed = parseInt(obj[key][prop], 10);
          res[key][prop] = isNaN(parsed) ? obj[key][prop] : parsed;
        }
      }
      return res;
    }

    var rest = convertIntObj(result);

   
    
    var arrayResult = Object.values(rest);
    // console.log(arrayResult)

    const newArray = arrayResult.map(item => {
      return { property_id: item.property_id, auction_event_id: item.event_id, address_street: item.address, address_city: item.city, address_county: item.county, address_state: item.state,credit_bid: item.credit_bid, display_reserve: item.displayed_reserve,inspection_report: item.property_inspection_report, property_type:item.property_type, bed_rooms: item.bedrooms, bath_rooms: item.baths, square_feet: item.sf, lot_size: item.lot_size, year_built: item.year_built, mls_comment: item.mlscomment, starting_bid: item.starting_bid, occupancy_status: item.occupancy_status, bidding_start_time: item.bidding_start_time, bidding_end_time: item.bidding_end_time, broker_first_name: item.broker_first_name, broker_last_name:item.broker_last_name, broker_email: item.broker_email, broker_phone: item.broker_phone, previously_listed_price: item.previously_listed_price, run_number: item.run_number, interior_access: item.interior_access_available, red_bell: item._redbell_, zillow: item._zillow_  };
    });
    console.log(newArray)
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <h5>Click and Drag Upload</h5>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton
        config={{
          header: true
        }}
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
    </div>
  );
}
