

var citySelect_list = document.getElementsByClassName("citySelect");
    citySelect_list = Array.from(citySelect_list)
    
    $.ajax({
        url: '/cities',
        type: 'GET',
        data: {}
    })
    .done(cities => {
        if(cities) {
            
            citySelect_list.forEach(citySelect => {
                
                cities.forEach(city => {
                    
                    const option = document.createElement('option');
                    option.value = city;
                    option.text = city;
                    citySelect.add(option);
                })

                citySelect.addEventListener('change', (event) => {
                    const selectedCity = event.target;
                    try {
                        ajaxDictrict(selectedCity);
                    } catch (err) {
                        console.log(err)
                    }
                    
                })
            })

            
        }
    })
    .fail(err => {
        console.log(err)
    })
///////////////////////////////////////////////////////////////

    const ajaxDictrict = function(selectedCity) {
        var districtSelect = selectedCity.parentNode.parentNode.getElementsByClassName("districtSelect")[0];
        if(districtSelect) {
            $.ajax({
                url: `/cities/districts/${selectedCity.value}`,
                type: 'GET',
                data: {}
            })
            .done(districts => {
                if(districts){
                    
                    districtSelect.innerHTML = "<option value='district1'>--Chọn Quận/Huyện--</option>";
                    districts.forEach(district => {
                        const option = document.createElement('option');
                        option.value = district;
                        option.text = district;
                        districtSelect.add(option);
                    })


                    districtSelect.addEventListener('change', (event) => {
                        const selectedDistrict = event.target;
                        ajaxCommunes(selectedDistrict, selectedCity);
                    })
                }
            })
            .fail(err => {
            console.log(err)
            })
        }
            
    }

    // citySelect_list.forEach(citySelect => {
    //     citySelect.addEventListener('change', (event) => {
    //         const selectedCity = event.target;
            
    //         var districtSelect = selectedCity.parentNode.parentNode.getElementsByClassName("districtSelect")[0];
    //         $.ajax({
    //             url: `/cities/districts/${selectedCity.value}`,
    //             type: 'GET',
    //             data: {}
    //         })
    //         .done(districts => {
    //             if(districts){
                    
    //                 districtSelect.innerHTML = "<option value='district1'>--Chọn Quận/Huyện--</option>";
    //                 districts.forEach(district => {
    //                     const option = document.createElement('option');
    //                     option.value = district;
    //                     option.text = district;
    //                     districtSelect.add(option);
    //                 })


    //                 districtSelect.addEventListener('change', (event) => {
    //                     const selectedDistrict = event.target;
    //                     ajaxCommunes(selectedDistrict, selectedCity);
    //                 })
    //             }
    //         })
    //         .fail(err => {
    //         console.log(err)
    //         })
    //     })
    // })

////////////////////////////////////////////////////////////////////
    const ajaxCommunes = function(selectedDistrict, selectedCity) {
        console.log(selectedDistrict.parentNode.parentNode.parentNode.getElementsByClassName("communeSelect")[0]);
        var communeSelect = selectedDistrict.parentNode.parentNode.parentNode.getElementsByClassName("communeSelect")[0];
        if(communeSelect) {
            $.ajax({
                url: `/cities/districts/${selectedCity.value}/commune/${selectedDistrict.value}`,
                type: 'GET',
                data: {}
            })
            .done(communes => {
                if(communes) {
                    communeSelect.innerHTML = '<option value="ward0">--Chọn Phường/Xã--</option>';
                    communes.forEach(commune => {
                        const option = document.createElement('option');
                        option.value = commune;
                        option.text = commune;
                        communeSelect.add(option);
                    })
    
                    try {
                        communeSelect.addEventListener('change', (event) => {
                            const selectedCommune = event.target;
                            ajaxPostal_code(selectedCommune ,selectedDistrict, selectedCity);
                        })
                    }catch(err) {
                        console.log(err);
                    }
                    
                }
            })
            .fail(err => {
                console.log(err)
            })
        }
        
    }


    ////////////////////////////////////
    const ajaxPostal_code = function(selectedCommune,selectedDistrict, selectedCity) {
        console.log(selectedCommune.parentNode.parentNode.getElementsByClassName("postal_codeSelect")[0]);
        var postal_codeSelect = selectedCommune.parentNode.parentNode.getElementsByClassName("postal_codeSelect")[0];
        if(postal_codeSelect) {
            if(postal_codeSelect.classList.contains('all_postal_code')){
                $.ajax({
                    url: `/cities/districts/${selectedCity.value}/commune/${selectedDistrict.value}/postal_code_all/${selectedCommune.value}`,
                    type: 'GET',
                    data: {}
                })
                .done(postal_codes => {
                    if(postal_codes) {
                        postal_codeSelect.innerHTML = '<option value="code0">--Chọn Mã Bưu Chính--</option>';
                        postal_codes.forEach(postal_code => {
                            const option = document.createElement('option');
                            option.value = postal_code;
                            option.text = postal_code;
                            postal_codeSelect.add(option);
                        })
        
                    }
                })
                .fail(err => {
                    console.log(err)
                })
            } else {
                $.ajax({
                    url: `/cities/districts/${selectedCity.value}/commune/${selectedDistrict.value}/postal_code/${selectedCommune.value}`,
                    type: 'GET',
                    data: {}
                })
                .done(postal_codes => {
                    if(postal_codes) {
                        postal_codeSelect.innerHTML = '<option value="code0">--Chọn Mã Bưu Chính--</option>';
                        postal_codes.forEach(postal_code => {
                            const option = document.createElement('option');
                            option.value = postal_code;
                            option.text = postal_code;
                            postal_codeSelect.add(option);
                        })
        
                    }
                })
                .fail(err => {
                    console.log(err)
                })
            }
            
        }
        
    }
