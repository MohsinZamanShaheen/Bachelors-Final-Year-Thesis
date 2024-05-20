package com.tfg.cisoDashboard.Responses;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ControlSummary {
    private String category;
    private int total;
    private int checked;

    public ControlSummary(String category, int total, int checked) {
        this.category = normalizeCategory(category);
        this.total = total;
        this.checked = checked;
    }

    public double getCheckedPercentage() {
        return total == 0 ? 0 : ((double) checked / total) * 100;
    }

    private String normalizeCategory(String category) {
        switch (category) {
            case "Controles Organizacionales":
                return "Organizational Controls";
            case "Controles de Personal":
                return "People Controls";
            case "Controles Físicos":
                return "Physical Controls";
            case "Controles Tecnológicos":
                return "Technological Controls";
            default:
                return category;
        }
    }
}