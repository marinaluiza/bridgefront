import React, {useState} from 'react';
import {Menu, Icon} from 'antd';
import Repositories from "./Repositories";
import Favorites from "./Favorites";
import axios from "axios";

const Initial = () => {

    const [themes, setThemes] = useState([]);
    const [currentMenu, setCurrentMenu] = useState("repositories");
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [repositories, setRepositories] = useState([]);

    const handleMenuClick = e => {
        setCurrentMenu(e.key);
    };

    const isFavorite = id => {
        let areFavorite = favorites.find(itemFav => itemFav.id === id);
        return areFavorite && areFavorite !== "undefined";
    };

    const getThemes = repositories => {
        let themes = [];
        repositories.forEach((element) => {
            themes[element.id] = isFavorite(element.id) ?
                <Icon type="star" theme="filled" /> :
                <Icon type="star" theme="outlined" />;

        });
        return themes;
    };


    const toggleFavorite = item => {
        if(isFavorite(item.id)) {
            setFavorites(favorites.filter(itemFav => itemFav.id !== item.id));
            themes[item.id] =  <Icon type="star" theme="outlined" />;
        } else {
            favorites.push(item);
            setFavorites(favorites);
            themes[item.id] =  <Icon type="star" theme="filled" /> ;
        }
        setThemes(themes);
    };

    const handleRepositories = search => {
        if(search != null && search !== "") {
            setLoading(true);
            axios.get(`https://bridgeback.herokuapp.com/repositories/` + search)
                .then(res => {
                    if (res != null && res.status === 200) {
                        setRepositories(res.data);
                        setThemes(getThemes(res.data));
                    }
                    setLoading(false)
                });
        }
    };

    return(
        <React.Fragment>
            <div className="divMenu">
                <Menu onClick={handleMenuClick} selectedKeys={[currentMenu]} mode="horizontal">
                    <Menu.Item key="repositories">
                        <Icon type="unordered-list" />
                        Respositories
                    </Menu.Item>
                    <Menu.Item key="favorites">
                        <Icon type="star" />
                        Favorites
                    </Menu.Item>
                </Menu>
            </div>
            {currentMenu === "repositories" &&
                <Repositories
                    loading={loading}
                    repositories={repositories}
                    handleRepositories={handleRepositories}
                    toggleFavorite={toggleFavorite.bind(this)}
                    isFavorite={isFavorite.bind(this)}
                    themes={themes}
                />
            }
            {currentMenu === "favorites" && <Favorites favorites={favorites} />}
        </React.Fragment>
    );

};

export default Initial;