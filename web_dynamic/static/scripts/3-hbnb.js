#!/usr/bin/node
amenity_dict = {}
amenity_list = []

$(document).ready(function() {
    $('input:checkbox').change(function() {
    if ($(this).is(':checked')) {
        console.log("CHECKED")
        amenity_id = $(this).data("id")
        amenity_name = $(this).data("name")
        amenity_dict[amenity_name] = amenity_id
        console.log(amenity_dict)
        amenity_list = Object.getOwnPropertyNames(amenity_dict)
        console.log(amenity_list.toString())
        if (amenity_list.length !== 0) {
            $("#amenity_list").text(amenity_list.toString())
        } else {
            $("#amenity_list").text('\xa0')
        }
        

    } else {
        console.log("UNCHECKED")
        amenity_id = $(this).data("id")
        amenity_name = $(this).data("name")
        delete amenity_dict[amenity_name]
        console.log(amenity_dict)
        amenity_list = Object.getOwnPropertyNames(amenity_dict)
        console.log(amenity_list.toString())
        if (amenity_list.length !== 0) {
            $("#amenity_list").text(amenity_list.toString())
        } else {
            $("#amenity_list").text('\xa0')
        }
    }
})
    // In order for this to work you must activate to simultaneous servers
    // One for the HBNB, the other for the API. 
    // For API: HBNB_MYSQL_USER=hbnb_dev HBNB_MYSQL_PWD=hbnb_dev_pwd HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_dev_db HBNB_TYPE_STORAGE=db HBNB_API_PORT=5001 python3 -m api.v1.app
    // For HBNB: HBNB_MYSQL_USER=hbnb_dev HBNB_MYSQL_PWD=hbnb_dev_pwd HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_dev_db HBNB_TYPE_STORAGE=dpython3 -m web_dynamic.2-hbnb
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data, status){
        console.log(status)
        const response = Object.values(data)
        console.log(response[0])
        if (response[0] == "OK") {
            $(" #api_status ").toggleClass('unavailable available')
        }
    })
    $.ajax({
        url: "http://0.0.0.0:5001/api/v1/places_search",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({}),
        success: function(response) {
          console.log("Success:", response);
          response.sort(function(a, b) {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0
            })
          for (const place of response) {
            $(".places").append(`
            <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest(s)</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom(s)</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>
            </div>
                <div class="description">
              ${place.description}
                </div>
                </article`)
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log("Error:", textStatus, errorThrown);
        }
      });
});