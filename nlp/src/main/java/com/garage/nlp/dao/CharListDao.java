package com.garage.nlp.dao;

import com.garage.nlp.dto.WordVector;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface CharListDao {
    int addCharRecord(@Param("wordVectorListMap") Map<String, List<WordVector>> wordVectorListMap);
}
