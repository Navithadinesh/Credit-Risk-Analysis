// Evaluation Scoring Functions for Credit Risk Analysis

export const calculateParameterScore = (parameter, value, parameterType) => {
    switch (parameterType) {
        case 'current_ra':
            // Current Ratio: >2.5=Excellent(90-100), 2.0-2.5=Good(70-89), 1.5-2.0=Average(50-69), 1.0-1.5=Poor(30-49), <1.0=Very Poor(0-29)
            if (value >= 2.5) return Math.min(90 + (value - 2.5) * 10, 100);
            if (value >= 2.0) return 70 + (value - 2.0) * 38;
            if (value >= 1.5) return 50 + (value - 1.5) * 40;
            if (value >= 1.0) return 30 + (value - 1.0) * 40;
            return Math.max(0, 30 - (1.0 - value) * 30);
            
        case 'quick_rati':
            // Quick Ratio: >2.0=Excellent(90-100), 1.5-2.0=Good(70-89), 1.0-1.5=Average(50-69), 0.5-1.0=Poor(30-49), <0.5=Very Poor(0-29)
            if (value >= 2.0) return Math.min(90 + (value - 2.0) * 10, 100);
            if (value >= 1.5) return 70 + (value - 1.5) * 38;
            if (value >= 1.0) return 50 + (value - 1.0) * 40;
            if (value >= 0.5) return 30 + (value - 0.5) * 40;
            return Math.max(0, 30 - (0.5 - value) * 60);
            
        case 'dso_days':
            // Days Sales Outstanding: <30=Excellent(90-100), 30-45=Good(70-89), 45-60=Average(50-69), 60-90=Poor(30-49), >90=Very Poor(0-29)
            if (value < 30) return 90 + (30 - value) * 0.33;
            if (value <= 45) return 70 - (value - 30) * 1.27;
            if (value <= 60) return 50 - (value - 45) * 1.33;
            if (value <= 90) return 30 - (value - 60) * 0.67;
            return Math.max(0, 30 - (value - 90) * 0.5);
            
        case 'revenue_c':
            // Revenue Change: >15%=Excellent(90-100), 5-15%=Good(70-89), 0-5%=Average(50-69), -5-0%=Poor(30-49), <-5%=Very Poor(0-29)
            if (value >= 15) return 90 + (value - 15) * 0.67;
            if (value >= 5) return 70 + (value - 5) * 2;
            if (value >= 0) return 50 + value * 4;
            if (value >= -5) return 30 + (value + 5) * 4;
            return Math.max(0, 30 + (value + 5) * 6);
            
        case 'pd_1y_pct':
            // Probability of Default: <1%=Excellent(90-100), 1-3%=Good(70-89), 3-5%=Average(50-69), 5-10%=Poor(30-49), >10%=Very Poor(0-29)
            if (value < 1) return 90 + (1 - value) * 10;
            if (value <= 3) return 70 - (value - 1) * 10;
            if (value <= 5) return 50 - (value - 3) * 10;
            if (value <= 10) return 30 - (value - 5) * 4;
            return Math.max(0, 30 - (value - 10) * 6);
            
        case 'lgd_pct':
            // Loss Given Default: <30%=Excellent(90-100), 30-40%=Good(70-89), 40-50%=Average(50-69), 50-70%=Poor(30-49), >70%=Very Poor(0-29)
            if (value < 30) return 90 + (30 - value) * 0.33;
            if (value <= 40) return 70 - (value - 30) * 2;
            if (value <= 50) return 50 - (value - 40) * 2;
            if (value <= 70) return 30 - (value - 50) * 1;
            return Math.max(0, 30 - (value - 70) * 1.5);
            
        case 'years_in_ownership':
            // Years in Ownership: >15=Excellent(90-100), 10-15=Good(70-89), 5-10=Average(50-69), 2-5=Poor(30-49), <2=Very Poor(0-29)
            if (value >= 15) return 90 + (value - 15) * 0.67;
            if (value >= 10) return 70 + (value - 10) * 4;
            if (value >= 5) return 50 + (value - 5) * 4;
            if (value >= 2) return 30 + (value - 2) * 6.67;
            return Math.max(0, 30 - (2 - value) * 15);
            
        case 'tig_governanc':
            // Governance Score: >80=Excellent(90-100), 70-80=Good(70-89), 60-70=Average(50-69), 50-60=Poor(30-49), <50=Very Poor(0-29)
            if (value >= 80) return 90 + (value - 80) * 0.5;
            if (value >= 70) return 70 + (value - 70) * 2;
            if (value >= 60) return 50 + (value - 60) * 2;
            if (value >= 50) return 30 + (value - 50) * 2;
            return Math.max(0, 30 - (50 - value) * 0.6);
            
        case 'collateral_cove':
            // Collateral Coverage: >70%=Excellent(90-100), 50-70%=Good(70-89), 30-50%=Average(50-69), 20-30%=Poor(30-49), <20%=Very Poor(0-29)
            if (value >= 70) return 90 + (value - 70) * 0.33;
            if (value >= 50) return 70 + (value - 50) * 1;
            if (value >= 30) return 50 + (value - 30) * 1;
            if (value >= 20) return 30 + (value - 20) * 2;
            return Math.max(0, 30 - (20 - value) * 1.5);
            
        // Categorical parameters
        case 'auditor':
            const auditorScores = { 'Big4': 90, 'Public': 75, 'Private': 60, 'Other': 45, 'State': 30 };
            return auditorScores[value] || 30;
            
        case 'country_ri':
            const countryScores = { 'Low': 90, 'Medium': 60, 'High': 30 };
            return countryScores[value] || 30;
            
        case 'legal_covenant':
            const covenantScores = { 'Strong': 90, 'Standard': 60, 'Weak': 30 };
            return covenantScores[value] || 30;
            
        case 'risk_bucke':
            const riskScores = { 'Low': 90, 'Medium': 60, 'High': 30 };
            return riskScores[value] || 30;
            
        case 'sanctions':
            const sanctionScores = { 'None': 90, 'Indirect': 60, 'Direct': 30 };
            return sanctionScores[value] || 30;
            
        case 'financials':
            const financialScores = { 'Yes': 90, 'No': 30 };
            return financialScores[value] || 30;
            
        default:
            return 50; // Default neutral score
    }
};

// Calculate overall credit risk score
export const calculateOverallScore = (client) => {
    const weights = {
        current_ra: 0.15,
        quick_rati: 0.10,
        dso_days: 0.10,
        revenue_c: 0.10,
        pd_1y_pct: 0.20,
        lgd_pct: 0.15,
        years_in_ownership: 0.05,
        tig_governanc: 0.05,
        collateral_cove: 0.05,
        auditor: 0.03,
        country_ri: 0.02
    };
    
    let totalScore = 0;
    let totalWeight = 0;
    
    Object.keys(weights).forEach(param => {
        if (client[param] !== undefined) {
            const score = calculateParameterScore(param, client[param], param);
            totalScore += score * weights[param];
            totalWeight += weights[param];
        }
    });
    
    return Math.round(totalScore / totalWeight);
};
