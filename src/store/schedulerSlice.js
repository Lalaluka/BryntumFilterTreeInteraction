import { createSlice } from '@reduxjs/toolkit';

const allResources = [
    { id: 'r1', name: 'Alice', role: 'developer', team: 'Frontend Team' },
    { id: 'r2', name: 'Bob', role: 'designer', team: 'Frontend Team' },
    { id: 'r3', name: 'Charlie', role: 'developer', team: 'Frontend Team' },
    { id: 'r4', name: 'Diana', role: 'developer', team: 'Backend Team' },
    { id: 'r5', name: 'Eve', role: 'devops', team: 'Backend Team' },
    { id: 'r6', name: 'Frank', role: 'developer', team: 'Backend Team' },
    { id: 'r7', name: 'Grace', role: 'tester', team: 'QA Team' },
    { id: 'r8', name: 'Hank', role: 'tester', team: 'QA Team' },
];

const allEvents = [
    { id: 'e1', resourceId: 'r1', name: 'Implement login', startDate: '2026-03-23', endDate: '2026-03-25' },
    { id: 'e2', resourceId: 'r2', name: 'Design dashboard', startDate: '2026-03-24', endDate: '2026-03-26' },
    { id: 'e3', resourceId: 'r3', name: 'Code review', startDate: '2026-03-23', endDate: '2026-03-24' },
    { id: 'e4', resourceId: 'r4', name: 'API endpoints', startDate: '2026-03-23', endDate: '2026-03-27' },
    { id: 'e5', resourceId: 'r5', name: 'CI/CD pipeline', startDate: '2026-03-25', endDate: '2026-03-27' },
    { id: 'e6', resourceId: 'r6', name: 'Database migration', startDate: '2026-03-24', endDate: '2026-03-26' },
    { id: 'e7', resourceId: 'r7', name: 'Regression tests', startDate: '2026-03-23', endDate: '2026-03-25' },
    { id: 'e8', resourceId: 'r8', name: 'Performance tests', startDate: '2026-03-25', endDate: '2026-03-28' },
];

function filterResources(resources, term) {
    const lower = term.toLowerCase();
    return resources.filter((r) => r.name.toLowerCase().includes(lower));
}

const schedulerSlice = createSlice({
    name: 'scheduler',
    initialState: {
        resources: allResources,
        events: allEvents,
        filterText: '',
    },
    reducers: {
        setFilterText(state, action) {
            const text = action.payload;
            state.filterText = text;
            state.resources = text.trim() === '' ? allResources : filterResources(allResources, text);
        },
    },
});

export const { setFilterText } = schedulerSlice.actions;
export default schedulerSlice.reducer;
