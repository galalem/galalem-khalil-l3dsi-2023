package com.ngx.news.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public
class ReactionTypeCountEntry {
    private Reaction.ReactionType key;
    private Long value;

    public Reaction.ReactionType getEnumKey() {
        if (this.key == null)
            return null;
        //return Reaction.ReactionType.valueOf(this.key);
        return (this.key);
    }
}
