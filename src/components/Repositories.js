import React, {useState} from 'react'
import {Popover, Input, Skeleton, List, Button} from "antd";
import axios from 'axios';
import RepositoryDetails from './RepositoryDetails';

const Repositories = ({toggleFavorite, isFavorite, repositories, loading, handleRepositories, themes}) => {

    const [loadingUserRepos, setLoadingUserRepos] = useState(false);
    const [repositoriesByUser, setRepositoriesByUser] = useState([]);
    const [activeKey, setActiveKey] = useState(0);
    const [itemDetail, setItemDetail] = useState(null);
    const [actualFavorite, setActualFavorite] = useState(null);
    const [actualFavoriteId, setActualFavoriteId] = useState(0);

    const { Search } = Input;

    const handleVisibleChange = (visible, item) => {
        if(visible) {
            setLoadingUserRepos(true);
            axios.get(`https://bridgeback.herokuapp.com/users/` + item.owner.login + "/repos")
                .then(res => {
                    if (res != null && res.status === 200) {
                        setRepositoriesByUser(res.data);
                    }
                    setLoadingUserRepos(false)
                });
            setActiveKey(item.id);
            setItemDetail(item);
        } else {
            setActiveKey(0);
            setItemDetail(null);
        }
    };

    const hide = () => {
        setActiveKey(0)
    };

    const handleTheme = item => {
        if(actualFavoriteId === item.id) {
            return actualFavorite;
        }
        return themes[item.id];
    };

    return(
        <React.Fragment>
        <div className="divSearch">
            <Search placeholder="Search by repository name" onSearch={handleRepositories} enterButton  />
        </div>
        <List
            loading={loading}
            itemLayout="horizontal"
            dataSource={repositories}
            renderItem={item => (
                <List.Item
                    actions={[
                        <Button onClick={() => {
                            toggleFavorite(item);
                            setActualFavoriteId(item.id);
                            setActualFavorite(themes[item.id]);
                        }} >
                            {handleTheme(item)}
                        </Button> ,
                        <Popover
                            content={<RepositoryDetails item={itemDetail} hide={hide} loading={loadingUserRepos} repositories={repositoriesByUser}/>}
                            title={item.name}
                            trigger="click"
                            visible={activeKey === item.id}
                            onVisibleChange={visible => handleVisibleChange(visible, item)}
                        >
                            <Button icon="more" />
                        </Popover>

                    ]}
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            title={item.name}
                            description={item.description +" Author:" + item.owner.login}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
        </React.Fragment>
    );
};

export default Repositories;