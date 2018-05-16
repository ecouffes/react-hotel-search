/* eslint-disable react/jsx-indent,react/jsx-indent-props */
import React, { Component } from 'react';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import Map from './Map';

import { geocode } from '../domain/Geocoder';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                lat: 35.6585805,
                lng: 139.7454329,
            },
        };
    }

    setErrorMessage(message) {
        this.setState({
            address: message,
            location: {
                lat: 0,
                lng: 0,
            },
        });
    }

    // 子から渡されたstate(place)を処理
    handlePlaceSubmit(place) {
        geocode(place)
            .then(({ status, address, location }) => {
                switch (status) {
                    case 'OK' : {
                        this.setState({ address, location });
                        break;
                    }
                    case 'ZERO_RESULTS' : {
                        this.setErrorMessage('結果が見つかりませんでした');
                        break;
                    }
                    default: {
                        this.setErrorMessage('エラーが発生しました');
                        break;
                    }
                }
            })
            .catch(() => {
                this.setErrorMessage('通信に失敗しました');
            });
    }


    render() {
        return (
            <div>
                <h1>緯度経度検索</h1>
                {/* 子に渡すpropsが関数の場合、子のstateを引数に入れることで、 */}
                {/* 子 => 親へstateを渡す事ができる */}
                <SearchForm onSubmit={place => this.handlePlaceSubmit(place)} />
                <GeocodeResult
                    address={this.state.address}
                    location={this.state.location}
                />
                <Map location={this.state.location} />
            </div>
        );
    }
}

export default App;
