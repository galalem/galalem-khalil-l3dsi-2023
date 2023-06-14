package com.ngx.news.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Calendar;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PostReactionsResponse {
    private Integer like;
    private Integer hate;
    private Integer haha;
    private Integer wow;
    private Integer sad;
    private Integer angry;
    private Integer disinterested;
    private Integer comment;
    private Integer view;
}
