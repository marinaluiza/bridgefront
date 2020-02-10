import React from "react";
import {List, Button} from "antd";


const RepositoryDetails = ({item, hide, repositories, loading}) => {

    return(
        <React.Fragment>
            {item !== null &&
                <div>
                    <h5>Language: {item.language}</h5>
                    <h5>Open issues: {item.open_issues_count}</h5>
                    <h5>Created At: {item.created_at}</h5>
                    <h5>Other repositories from {item.owner.login}:</h5>
                    <List
                        loading={loading}
                        size="small"
                        dataSource={repositories}
                        renderItem={item => (
                            <List.Item>{item.name}</List.Item>
                        )}
                    />
                    <Button type="link" onClick={hide}>Close</Button>
                </div>
            }
            </React.Fragment>
    );
};

export default RepositoryDetails;