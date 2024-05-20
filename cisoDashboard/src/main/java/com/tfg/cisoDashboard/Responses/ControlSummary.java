package com.tfg.cisoDashboard.Responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ControlSummary {
    private String category;
    private int total;
    private int checked;
    private double checkedPercentage;

    public ControlSummary(String category, int total, int checked) {
        this.category = category;
        this.total = total;
        this.checked = checked;
        this.checkedPercentage = total == 0 ? 0 : ((double) checked / total) * 100;
    }
}
