package vn.com.java.service.mapper;

import java.util.Set;
import org.mapstruct.*;
import vn.com.java.domain.Task;
import vn.com.java.service.dto.TaskDTO;

/**
 * Mapper for the entity {@link Task} and its DTO {@link TaskDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TaskMapper extends EntityMapper<TaskDTO, Task> {
    @Named("titleSet")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    Set<TaskDTO> toDtoTitleSet(Set<Task> task);
}
