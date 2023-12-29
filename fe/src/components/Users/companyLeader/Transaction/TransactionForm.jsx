import React, {useContext, useEffect, useState} from "react";
import axiosClient from "../../../../axios.js";
import AddressSelect from "../../../Common/FindPost/AddressSelect.jsx";
import "../styleAggregation.css";
import {useStateContext} from "../../../../contexts/ContextProvider.jsx";
import {CompanyLeaderContext} from "../CompanyLeaderProvider.jsx";

const InputField = ({label, id, value, onChange, type = "text"}) => (
    <div className="col-tmp-1">
        <label htmlFor={id}>{label}:</label>
        <input
            type={type}
            id={id}
            className="form-control"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{width: "94%"}}
        />
    </div>
);

const TransactionForm = () => {
    // const {setSubmitted} = useContext(TransactionContext);
    const {setSubmitted} = useContext(CompanyLeaderContext);
    const {showToast} = useStateContext();
    const [isExpanded, setExpanded] = useState(false);

    const [aggregationList, setAggregationList] = useState([]);

    useEffect(() => {
        axiosClient.get('/aggregationPoint')
            .then(({data}) => {
                setAggregationList(data.aggregationPoints);
                setSubmitted(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleExpandClick = () => {
        setExpanded(!isExpanded);
    };

    const [formData, setFormData] = useState({
        aggregation_point_id: "",
        name: "",
        code: "",
        phone: "",
        email: "",
        operatingHours: "",
        status: "",
        notes: "",
        capacity: 0,
        current_load: 0,
    });
    const handleAggregationChange = (e) => {
        const selectedAggregation = e.target.value;
        setFormData({
            ...formData,
            aggregation_point_id: selectedAggregation,
        });
        // onSelectProvince(selectedProvinceCode, e.target.options[e.target.selectedIndex].text);
    };

    const [address, setAddress] = useState({
        province: "",
        district: "",
        ward: "",
        detailed_address: "",
    });

    // useEffect(() => {
    //     axiosClient.get('/aggregationPoint')
    //         .then(({data}) => {
    //             setAggregationList(data.aggregationPoints)
    //         })
    // }, [])
    //

    const handleAddressChange = (selectedCode, selectedText, type) => {
        switch (type) {
            case "province":
                setAddress((prevAddress) => ({
                    ...prevAddress,
                    province: selectedText,
                }));
                break;
            case "district":
                setAddress((prevAddress) => ({
                    ...prevAddress,
                    district: selectedText,
                }));
                break;
            case "ward":
                setAddress((prevAddress) => ({
                    ...prevAddress,
                    ward: selectedText,
                }));
                break;
            case "detailed_address":
                setAddress((prevAddress) => ({
                    ...prevAddress,
                    detailed_address: selectedText,
                }));
                break;
            default:
                break;
        }
    };
    const renderOptions = (array) => {
        return array.map((element) => (
            <option key={element.id} value={element.id}>
                {element.name}
            </option>
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosClient
            .post("/transactionPoint", {...address, ...formData})
            .then(() => {
                setSubmitted(true);
                showToast("Thêm thành công");
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <div className="row">
            <div className="expand-button" onClick={handleExpandClick}>
                {isExpanded ? (
                    <div
                        className={`box-title text-uppercase expanded`}
                        onClick={handleExpandClick}
                    >
                        Ẩn Chỉnh Sửa
                    </div>
                ) : (
                    <div
                        className={`box-title text-uppercase expanded justify-center`}
                        onClick={handleExpandClick}
                    >
                        Thêm điểm
                    </div>
                )}
            </div>
            {isExpanded && (
                <div className={`box-title text-uppercase`}>
                    Thêm Điểm Giao Dịch{" "}
                </div>
            )}

            <form style={{width: "100%"}} onSubmit={handleSubmit}>
                {isExpanded && (
                    <div className="col-search-box">
                        <h1>Các thông tin cho điểm giao dịch</h1>
                        <div className="search-box flex justify-center items-center rounded">
                            <div className="col-tmp-1">
                                <label htmlFor="city" className="">
                                    Thuộc điểm tập kết ?
                                </label>
                                <select
                                    id="city"
                                    className="form-select text-base mb-2.5 block w-full rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
                                    value={formData.aggregation_point_id}
                                    onChange={handleAggregationChange}
                                    style={{
                                        height: "50px",
                                        width: "490px",
                                    }}
                                >
                                    <option disabled value="">
                                        Chọn điểm tập kết ?
                                    </option>
                                    {renderOptions(aggregationList)}
                                </select>
                            </div>

                            <InputField
                                label="Tên Điểm giao dịch"
                                id="name"
                                value={formData.name}
                                onChange={(value) =>
                                    setFormData({...formData, name: value})
                                }
                            />
                            <InputField
                                label="Mã điểm giao dịch"
                                id="code"
                                value={formData.code}
                                onChange={(value) =>
                                    setFormData({...formData, code: value})
                                }
                            />
                            <InputField
                                label="Số điện thoại"
                                id="phone"
                                value={formData.phone}
                                onChange={(value) =>
                                    setFormData({...formData, phone: value})
                                }
                            />
                            <InputField
                                label="Email"
                                id="email"
                                value={formData.email}
                                onChange={(value) =>
                                    setFormData({...formData, email: value})
                                }
                            />
                            <InputField
                                label="Giờ làm việc"
                                id="operatingHours"
                                value={formData.operatingHours}
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        operatingHours: value,
                                    })
                                }
                            />
                            <InputField
                                label="Trạng thái"
                                id="status"
                                value={formData.status}
                                onChange={(value) =>
                                    setFormData({...formData, status: value})
                                }
                            />
                            <InputField
                                label="Ghi chú"
                                id="notes"
                                value={formData.notes}
                                onChange={(value) =>
                                    setFormData({...formData, notes: value})
                                }
                            />
                            <InputField
                                label="Dung lượng"
                                id="capacity"
                                value={formData.capacity}
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        capacity: value,
                                    })
                                }
                                type="number"
                            />
                            <InputField
                                label="Tải hiện tại"
                                id="current_load"
                                value={formData.current_load}
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        current_load: value,
                                    })
                                }
                                type="number"
                            />
                        </div>

                        <h1>Thêm địa chỉ</h1>
                        <AddressSelect
                            onSelectProvince={(code, text) =>
                                handleAddressChange(code, text, "province")
                            }
                            onSelectDistrict={(code, text) =>
                                handleAddressChange(code, text, "district")
                            }
                            onSelectWard={(code, text) =>
                                handleAddressChange(code, text, "ward")
                            }
                            onSelectDetail={(value) =>
                                handleAddressChange(
                                    null,
                                    value,
                                    "detailed_address"
                                )
                            }
                        />
                        <div className="col-tmp-2 col-right col-left">
                            <input
                                type="submit"
                                value="Thêm"
                                className="btn btn-search-branch"
                            />
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default TransactionForm;
