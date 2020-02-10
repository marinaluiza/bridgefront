import React from "react";
import {Skeleton, List} from "antd";


const Favorites = ({favorites}) => {

    return(
        <React.Fragment>
            <List
                itemLayout="horizontal"
                dataSource={favorites}
                renderItem={item => (
                    <List.Item
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

export default Favorites;