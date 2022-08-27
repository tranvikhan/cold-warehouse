import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import StatusChart from './StatusChart';
import SChart3D from './SChart';
import Matrix from './matrix';

class TabsChart extends Component {
    constructor(props) {
        super(props);
        this.state = { activeTab: '3' };
        this.toggle = this.toggle.bind(this);
    }

    /**
     * Toggle the tab
     */
    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    };
    render() {
        const tabContents = [
            {
                id: '1',
                title: 'Line',
                disabled: false,
            },
            {
                id: '2',
                title: '2D',
                disabled: false,
            },
            {
                id: '3',
                title: '3D',
                disabled: false,
            },
        ];

        return (
            <>
                <Nav className="nav nav-pills navtab-bg nav-justified">
                    {tabContents.map((tab, index) => {
                        return (
                            <NavItem key={index}>
                                <NavLink
                                    href="#"
                                    disabled={tab.disabled}
                                    className={classnames({ active: this.state.activeTab === tab.id })}
                                    onClick={() => {
                                        this.toggle(tab.id);
                                    }}>
                                    <i className={classnames(tab.icon, 'd-sm-none', 'd-block', 'mr-1')}></i>
                                    {tab.title}
                                </NavLink>
                            </NavItem>
                        );
                    })}
                </Nav>
                <TabContent activeTab={this.state.activeTab} className="mr-3 mt-4">
                    <TabPane tabId="1">
                        <StatusChart />
                    </TabPane>
                    <TabPane tabId="2">
                        <Matrix />
                    </TabPane>
                    <TabPane tabId="3">
                        <SChart3D />
                    </TabPane>
                </TabContent>
            </>
        );
    }
}

export default TabsChart;
